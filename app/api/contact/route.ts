import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactEmailTemplate, getContactEmailText } from '@/components/EmailTemplate';

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
            react: await ContactEmailTemplate({
                name,
                email,
                phone: phone,
                message: text
            }),
            text: getContactEmailText({
                name,
                email,
                phone: phone,
                message: text
            }),
        });

        if (error) {
            console.error('❌ メール送信エラー:', error);
            return NextResponse.json(
                { success: false, error: 'メール送信に失敗しました', details: error.message },
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