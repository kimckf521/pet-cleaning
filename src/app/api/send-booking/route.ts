import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const body = await request.json();
    const { customer_name, phone, email, address, plan_name, num_cats, frequency, language } = body;

    // Create admin notification email (Chinese only)
    const adminEmailText = `
新服务预约申请

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

客户信息
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

姓名：${customer_name}
电话：${phone}
邮箱：${email}
地址：${address}

服务详情
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

选择方案：${plan_name}
猫咪数量：${num_cats}
每周期数：${frequency === 'custom' ? '7次以上 (联系定制)' : `${frequency} 次`}
语言偏好：${language}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

提交时间：${new Date().toLocaleString()}
    `;

    // Create customer confirmation email (bilingual)
    const isEnglish = language === 'English';
    const customerEmailText = isEnglish ? `
🐾 ScooPo
Melbourne's Premium Pet Cleaning Service

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ BOOKING CONFIRMED!

Hi ${customer_name},

Thank you for choosing ScooPo! We've received your booking request and our team will contact you within 24 hours to confirm your service schedule.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 YOUR BOOKING DETAILS

Plan: ${plan_name}
Number of Cats: ${num_cats}
Visits per Week: ${frequency === 'custom' ? '7+ (Custom Quote)' : `${frequency} visits/week`}
Service Address: ${address}
Contact Phone: ${phone}
Contact Email: ${email}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 WHAT HAPPENS NEXT?

1. Our team will review your booking details
2. We'll call you within 24 hours to confirm your schedule
3. You'll receive a confirmation with your first service date
4. Sit back and relax - we'll take care of the rest! 😊

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💬 QUESTIONS?

Simply reply to this email - we're here to help!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ScooPo Pet Cleaning
Serving Box Hill & Blackburn Area
© 2026 ScooPo. All rights reserved.
    ` : `
🐾 ScooPo
墨尔本优质宠物清洁服务

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ 预约已确认！

您好 ${customer_name}，

感谢您选择 ScooPo！我们已收到您的预约申请，我们的团队将在 24 小时内与您联系，确认服务时间安排。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 您的预约详情

服务方案：${plan_name}
猫咪数量：${num_cats}
每周期数：${frequency === 'custom' ? '7次以上 (联系定制)' : `${frequency} 次/周`}
服务地址：${address}
联系电话：${phone}
联系邮箱：${email}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 接下来会发生什么？

1. 我们的团队将审核您的预约详情
2. 我们将在 24 小时内致电您确认服务时间
3. 您将收到首次服务日期的确认
4. 请放心 - 剩下的交给我们！😊

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💬 有疑问？

直接回复此邮件即可 - 我们随时为您服务！

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ScooPo 宠物清洁
服务区域：Box Hill 和 Blackburn
© 2026 ScooPo. 保留所有权利。
    `;

    // Send admin notification email (Chinese)
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: process.env.RESEND_TO_EMAIL!,
        subject: `新预约 - ${plan_name}`,
        text: adminEmailText,
      });
    } catch (error) {
      console.error('Failed to send admin notification:', error);
      // Admin email is critical, so we throw the error
      throw error;
    }

    // Send customer confirmation email
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: email,
        replyTo: process.env.RESEND_TO_EMAIL!,
        subject: isEnglish ? 'Booking Confirmed - ScooPo Pet Cleaning Service' : '预约确认 - ScooPo 宠物清洁服务',
        text: customerEmailText,
      });
    } catch (error) {
      // Customer email failure is non-critical (e.g., unverified email in Resend test mode)
      console.warn('Failed to send customer confirmation email:', error);
      // We don't throw here - admin notification is more important
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Resend Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
