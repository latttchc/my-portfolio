import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { formSchema } from "@/server/schemas";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // バリデーション
    const validatedData = formSchema.parse(body);
    const { name, email, phone, text } = validatedData;

    // Nodemailer transporter設定（修正: createTestAccount → createTransporter）
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.GMAILUSER,
        pass: process.env.GMAILPASSWORD,
      },
    });

    // 管理者が受け取るメール
    const toHostMailData = {
      from: process.env.GMAILUSER, // 修正: 認証されたアドレスから送信
      to: process.env.GMAILUSER,
      replyTo: email, // 返信先を問い合わせ者に設定
      subject: `[ポートフォリオ] お問い合わせ: ${name}様より`, // 修正: sugject → subject
      text: `${text}\n\nSent from: ${email}`, // 修正: message → text
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            お問い合わせ
          </h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <div style="margin-bottom: 15px;">
              <strong style="color: #495057;">名前:</strong>
              <p style="margin: 5px 0; color: #212529;">${name}</p>
            </div>
            <div style="margin-bottom: 15px;">
              <strong style="color: #495057;">メールアドレス:</strong>
              <p style="margin: 5px 0; color: #212529;">${email}</p>
            </div>
            <div style="margin-bottom: 15px;">
              <strong style="color: #495057;">電話番号:</strong>
              <p style="margin: 5px 0; color: #212529;">${phone || "未入力"}</p>
            </div>
            <div style="margin-bottom: 15px;">
              <strong style="color: #495057;">お問い合わせ内容:</strong>
              <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #007bff; margin-top: 10px;">
                <p style="margin: 0; color: #212529; line-height: 1.6;">
                  ${text.replace(/\n/g, "<br>")}
                </p>
              </div>
            </div>
          </div>
          <p style="color: #6c757d; font-size: 12px; margin-top: 20px;">
            送信日時: ${new Date().toLocaleString("ja-JP", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      `,
    };

    //     // 自動返信メール
    //     const autoReplyMailData = {
    //         from: process.env.GMAILUSER,
    //         to: email,
    //         subject: "お問い合わせありがとうございます",
    //         html: `
    //     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    //       <h2 style="color: #333; border-bottom: 2px solid #28a745; padding-bottom: 10px;">
    //         お問い合わせありがとうございます
    //       </h2>
    //       <p style="color: #212529; line-height: 1.6;">${name} 様</p>
    //       <p style="color: #212529; line-height: 1.6;">
    //         この度は、お問い合わせいただきありがとうございます。<br>
    //         以下の内容で承りました。
    //       </p>
    //       <div style="background: #f8f9fa; padding: 15px; border-radius: 4px; margin: 20px 0; border-left: 4px solid #28a745;">
    //         <p style="margin: 0 0 10px 0; color: #495057;"><strong>お問い合わせ内容:</strong></p>
    //         <p style="margin: 0; color: #212529; line-height: 1.6;">${text}</p>
    //       </div>
    //       <p style="color: #212529; line-height: 1.6;">
    //         通常2-3営業日以内にご返信いたします。<br>
    //         お急ぎの場合は、直接SNSまでご連絡ください。
    //       </p>
    //       <p style="color: #212529; line-height: 1.6; margin-top: 30px;">
    //         よろしくお願いいたします。
    //       </p>
    //       <hr style="border: none; border-top: 1px solid #dee2e6; margin: 30px 0;">
    //       <p style="color: #6c757d; font-size: 12px;">
    //         このメールは自動送信されています。<br>
    //         返信いただいても確認できませんので、ご了承ください。
    //       </p>
    //     </div>
    //   `
    //     };

    // メール送信
    console.log("管理者向けメール送信中...");
    await transporter.sendMail(toHostMailData);

    // console.log("自動返信メール送信中...");
    // await transporter.sendMail(autoReplyMailData);

    console.log("メール送信完了");

    return NextResponse.json(
      { message: "メールが正常に送信されました" },
      { status: 200 },
    );
  } catch (error) {
    console.error("メール送信エラー:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      {
        error: "メール送信に失敗しました",
        details:
          process.env.NODE_ENV === "development" ? errorMessage : undefined,
      },
      { status: 500 },
    );
  }
}
