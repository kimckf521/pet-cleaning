import express, { Request, Response } from 'express';
import cors from 'cors';
import * as admin from 'firebase-admin';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

const app = express();
const PORT = 8080;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Firebase Setup
const serviceAccountPath = path.join(__dirname, '../serviceAccountKey.json');
let db: admin.firestore.Firestore | null = null;

if (fs.existsSync(serviceAccountPath)) {
  try {
    const serviceAccount = require(serviceAccountPath);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    db = admin.firestore();
    console.log('Firebase connected successfully.');
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }
} else {
  console.warn('⚠️  serviceAccountKey.json not found. Running in MOCK mode.');
}

// Validation Schema
const bookingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().min(1, "Address is required"),
  numCats: z.number().min(1),
  frequency: z.union([z.number(), z.string()]),
  plan: z.string().optional(),
  timeOfDay: z.string().optional(),
  notes: z.string().optional(),
  language: z.string().optional()
});

// In-memory storage for MOCK mode
let mockBookings: any[] = [];

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('WasteWhisk Backend Running');
});

// Admin Protection Middleware (Simple)
const adminAuth = (req: Request, res: Response, next: Function) => {
  const token = req.headers['admin-token'];
  if (token === 'scoopo-admin-2026') {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

app.get('/api/bookings', adminAuth, async (req: Request, res: Response) => {
  try {
    if (db) {
      const snapshot = await db.collection('bookings').orderBy('createdAt', 'desc').get();
      const bookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(bookings);
    } else {
      res.status(200).json(mockBookings);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

app.post('/api/bookings', async (req: Request, res: Response) => {
  try {
    const validatedData = bookingSchema.parse(req.body);
    const bookingEntry = {
        ...validatedData,
        id: Math.random().toString(36).substr(2, 9),
        status: 'pending',
        createdAt: new Date().toISOString()
    };

    if (db) {
        // Real Mode
        await db.collection('bookings').add({
            ...validatedData,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
        console.log('Booking saved to Firestore:', validatedData);
    } else {
        // Mock Mode
        mockBookings.unshift(bookingEntry);
        console.log('[MOCK] Booking received:', validatedData);
    }

    // --- Send Emails ---
    try {
      // 1. Admin Notification (Chinese)
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@scoopo.com.au';
      await resend.emails.send({
        from: 'ScooPo Booking <info@scooposervice.com>',
        to: adminEmail,
        subject: `🔔 新预约通知: ${validatedData.name}`,
        html: `
          <h3>收到新的预约申请！</h3>
          <p><strong>客户姓名:</strong> ${validatedData.name}</p>
          <p><strong>电话:</strong> ${validatedData.phone}</p>
          <p><strong>邮箱:</strong> ${validatedData.email}</p>
          <p><strong>地址:</strong> ${validatedData.address}</p>
          <p><strong>选择方案:</strong> ${validatedData.plan || 'Essential'}</p>
          <p><strong>猫咪数量:</strong> ${validatedData.numCats}</p>
          <p><strong>每周频率:</strong> ${validatedData.frequency === 'custom' ? '7次以上 (联系定制)' : `${validatedData.frequency} 次`}</p>
          <p><strong>首选时间:</strong> ${validatedData.timeOfDay}</p>
          <p><strong>备注:</strong> ${validatedData.notes || '无'}</p>
          <hr />
          <p>请尽快联系客户进行确认。</p>
        `
      });

      // 2. Customer Confirmation (Bilingual)
      await resend.emails.send({
        from: 'ScooPo <info@scooposervice.com>',
        to: validatedData.email,
        subject: 'Thank you for your booking! | 感谢您的预约！',
        html: `
          <h2>Hi ${validatedData.name},</h2>
          <p>We have received your booking request for pet waste removal services.</p>
          <p><strong>Plan:</strong> ${validatedData.plan || 'Essential'}</p>
          <p><strong>Address:</strong> ${validatedData.address}</p>
          <p>Our team will contact you within 24 hours to confirm your schedule.</p>
          <br />
          <hr />
          <h2>您好 ${validatedData.name},</h2>
          <p>我们已经收到您的宠物粪便清理预约申请。</p>
          <p><strong>服务地址:</strong> ${validatedData.address}</p>
          <p>我们的团队将在 24 小时内联系您以确认最终的时间表。</p>
          <br />
          <p>Best Regards / 此致,<br/>The ScooPo Team</p>
        `
      });
      console.log('Emails sent successfully.');
    } catch (emailError) {
      console.error('Error sending emails:', emailError);
      // We don't fail the whole request if emails fail, but we log it
    }

    res.status(200).json({ message: 'Booking received successfully', data: validatedData });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      console.error('Server Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

app.delete('/api/bookings/:id', adminAuth, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (db) {
            await db.collection('bookings').doc(id).delete();
        } else {
            mockBookings = mockBookings.filter(b => b.id !== id);
        }
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete booking' });
    }
});

app.patch('/api/bookings/:id', adminAuth, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (db) {
            await db.collection('bookings').doc(id).update({ status });
        } else {
            const index = mockBookings.findIndex(b => b.id === id);
            if (index !== -1) {
                mockBookings[index].status = status;
            }
        }
        res.status(200).json({ message: 'Booking updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update booking' });
    }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
