import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { formSchema } from '@/server/schemas';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    try {
        // 環境変数チェック
        if (!process.env.RESEND_API_KEY) {
            console.error('❌ RESEND_API_KEY未設定');
            return NextResponse.json(
                { success: false, error: 'API設定エラー' },
                { status: 500 }
            );
        }

        const toEmail = process.env.RESEND_TO_EMAIL
        if (!toEmail) {
            console.error('❌ CONTACT_EMAIL未設定');
            return NextResponse.json(
                { success: false, error: 'メール送信先設定エラー' },
                { status: 500 }
            );
        }

        // リクエストボディ取得
        const body = await request.json();
        const { name, email, phone, text } = body;

        // メール送信
        const { data, error } = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: toEmail,
            replyTo: email,
            subject: `[ポートフォリオ] ${name}様からお問い合わせ`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            📧 新しいお問い合わせ
          </h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <div style="margin-bottom: 15px;">
              <strong style="color: #495057;">👤 お名前:</strong>
              <p style="margin: 5px 0; color: #212529;">${name}</p>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #495057;">📧 メールアドレス:</strong>
              <p style="margin: 5px 0; color: #212529;">
                <a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a>
              </p>
            </div>
            
            ${phone ? `
            <div style="margin-bottom: 15px;">
              <strong style="color: #495057;">📞 電話番号:</strong>
              <p style="margin: 5px 0; color: #212529;">${phone}</p>
            </div>
            ` : ''}
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #495057;">💬 お問い合わせ内容:</strong>
              <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #007bff; margin-top: 10px;">
                <p style="margin: 0; color: #212529; line-height: 1.6; white-space: pre-wrap;">${text}</p>
              </div>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #6c757d; font-size: 12px;">
            <p>📅 送信日時: ${new Date().toLocaleString('ja-JP', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Asia/Tokyo'
            })}</p>
          </div>
        </div>
      `,
            text: `
新しいお問い合わせ

名前: ${name}
メールアドレス: ${email}
${phone ? `電話番号: ${phone}` : ''}

お問い合わせ内容:
${text}

送信日時: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}
      `,
        });

        if (error) {
            console.error('❌ Resendエラー:', error);
            return NextResponse.json(
                {
                    success: false,
                    error: 'メール送信に失敗しました',
                    details: error.message
                },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'お問い合わせを送信しました。ありがとうございます！',
            id: data?.id
        });

    } catch (error) {
        console.error('❌ API Route エラー:', error);

        return NextResponse.json(
            {
                success: false,
                error: 'サーバーエラーが発生しました',
                details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
}

// GET
export async function GET() {
    return NextResponse.json(
        { error: 'Method not allowed. Use POST.' },
        { status: 405 }
    );
}