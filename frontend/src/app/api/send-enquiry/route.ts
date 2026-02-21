import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customer_name, email, message, language } = body;

    // Create admin notification email (Chinese only)
    const adminEmailText = `
新客户咨询

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

联系信息
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

姓名：${customer_name}
邮箱：${email}

留言内容
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

语言偏好：${language}
提交时间：${new Date().toLocaleString()}
    `;

    // Create customer confirmation email (bilingual)
    const isEnglish = language === 'English';
    const customerEmailText = isEnglish ? `
🐾 ScooPo
Melbourne's Premium Pet Cleaning Service

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📬 MESSAGE RECEIVED!

Hi ${customer_name},

Thank you for reaching out to ScooPo! We've received your enquiry and our team will get back to you within 24 hours.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💬 YOUR MESSAGE

"${message}"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏰ RESPONSE TIME

We typically respond to enquiries within 24 hours during business days. If your enquiry is urgent, please reply to this email.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌟 WHILE YOU WAIT

Check out our service plans and see why Melbourne cat owners love ScooPo! We scoop, remove, and vacuum - so you don't have to! 🐱

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ScooPo Pet Cleaning
Serving Box Hill & Blackburn Area
© 2026 ScooPo. All rights reserved.
    ` : `
🐾 ScooPo
墨尔本优质宠物清洁服务

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📬 留言已收到！

您好 ${customer_name}，

感谢您联系 ScooPo！我们已收到您的咨询，我们的团队将在 24 小时内回复您。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💬 您的留言

"${message}"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏰ 回复时间

我们通常在工作日的 24 小时内回复咨询。如果您的咨询比较紧急，请直接回复此邮件。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌟 在等待期间

查看我们的服务方案，了解为什么墨尔本的猫主人都喜爱 ScooPo！我们负责清理、清除和吸尘 - 您无需动手！🐱

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
        subject: `新咨询 - ${customer_name}`,
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
        reply_to: process.env.RESEND_TO_EMAIL!,
        subject: isEnglish ? 'We Received Your Message - ScooPo' : '我们已收到您的留言 - ScooPo',
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
