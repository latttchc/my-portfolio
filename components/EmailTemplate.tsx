import * as React from 'react';

interface ContactEmailTemplateProps {
    name: string;
    email: string;
    phone?: string;
    message: string;
}

export const ContactEmailTemplate: React.FC<ContactEmailTemplateProps> = ({
    name,
    email,
    phone,
    message,
}) => (
    <div style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#ffffff'
    }}>
        {/* ヘッダー */}
        <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '30px',
            borderRadius: '10px 10px 0 0',
            color: 'white',
            textAlign: 'center' as const
        }}>
            <h1 style={{
                margin: '0',
                fontSize: '28px',
                fontWeight: 'bold'
            }}>
                📧 お問い合わせ
            </h1>
        </div>

        {/* メインコンテンツ */}
        <div style={{
            background: '#f8f9fa',
            padding: '30px',
            borderRadius: '0 0 10px 10px',
            border: '1px solid #e9ecef'
        }}>
            <div style={{
                background: 'white',
                padding: '25px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <h2 style={{
                    color: '#495057',
                    marginTop: '0',
                    borderBottom: '2px solid #667eea',
                    paddingBottom: '10px',
                    fontSize: '20px'
                }}>
                    📝 お問い合わせ詳細
                </h2>

                {/* お名前 */}
                <div style={{ marginBottom: '20px' }}>
                    <strong style={{
                        color: '#6c757d',
                        display: 'block',
                        marginBottom: '5px',
                        fontSize: '14px'
                    }}>
                        👤 お名前
                    </strong>
                    <p style={{
                        margin: '0',
                        padding: '10px',
                        background: '#f8f9fa',
                        borderLeft: '4px solid #667eea',
                        borderRadius: '4px',
                        fontSize: '16px'
                    }}>
                        {name}
                    </p>
                </div>

                {/* メールアドレス */}
                <div style={{ marginBottom: '20px' }}>
                    <strong style={{
                        color: '#6c757d',
                        display: 'block',
                        marginBottom: '5px',
                        fontSize: '14px'
                    }}>
                        📧 メールアドレス
                    </strong>
                    <p style={{
                        margin: '0',
                        padding: '10px',
                        background: '#f8f9fa',
                        borderLeft: '4px solid #667eea',
                        borderRadius: '4px',
                        fontSize: '16px'
                    }}>
                        <a
                            href={`mailto:${email}`}
                            style={{
                                color: '#667eea',
                                textDecoration: 'none'
                            }}
                        >
                            {email}
                        </a>
                    </p>
                </div>

                {/* 電話番号（オプション） */}
                {phone && (
                    <div style={{ marginBottom: '20px' }}>
                        <strong style={{
                            color: '#6c757d',
                            display: 'block',
                            marginBottom: '5px',
                            fontSize: '14px'
                        }}>
                            📞 電話番号
                        </strong>
                        <p style={{
                            margin: '0',
                            padding: '10px',
                            background: '#f8f9fa',
                            borderLeft: '4px solid #667eea',
                            borderRadius: '4px',
                            fontSize: '16px'
                        }}>
                            <a
                                href={`tel:${phone}`}
                                style={{
                                    color: '#667eea',
                                    textDecoration: 'none'
                                }}
                            >
                                {phone}
                            </a>
                        </p>
                    </div>
                )}

                {/* メッセージ */}
                <div style={{ marginBottom: '20px' }}>
                    <strong style={{
                        color: '#6c757d',
                        display: 'block',
                        marginBottom: '5px',
                        fontSize: '14px'
                    }}>
                        💬 お問い合わせ内容
                    </strong>
                    <div style={{
                        margin: '0',
                        padding: '15px',
                        background: '#f8f9fa',
                        borderLeft: '4px solid #667eea',
                        borderRadius: '4px',
                        whiteSpace: 'pre-wrap' as const,
                        fontSize: '16px',
                        lineHeight: '1.6'
                    }}>
                        {message}
                    </div>
                </div>
            </div>

            {/* 送信日時 */}
            <div style={{
                marginTop: '20px',
                padding: '15px',
                background: '#e9ecef',
                borderRadius: '8px',
                textAlign: 'center' as const
            }}>
                <p style={{
                    margin: '0',
                    color: '#6c757d',
                    fontSize: '12px'
                }}>
                    📅 送信日時: {new Date().toLocaleString('ja-JP', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZone: 'Asia/Tokyo'
                    })}
                </p>
            </div>
        </div>

        {/* フッター */}
        <div style={{
            textAlign: 'center' as const,
            marginTop: '20px',
            color: '#6c757d',
            fontSize: '12px'
        }}>
            <p style={{ margin: '0' }}>
                このメールはポートフォリオサイトのお問い合わせフォームから自動送信されています。
            </p>
        </div>
    </div>
);

// プレーンテキスト版メールテンプレート
export const getContactEmailText = ({
    name,
    email,
    phone,
    message,
}: {
    name: string;
    email: string;
    phone?: string;
    message: string;
}) => `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
【新しいお問い合わせ】
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 お名前
${name}

📧 メールアドレス
${email}

${phone ? `📞 電話番号
${phone}

` : ''}💬 お問い合わせ内容
${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 送信日時: ${new Date().toLocaleString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Tokyo'
})}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

このメールはポートフォリオサイトから自動送信されています。
`.trim();

// 後方互換性のため、古いコンポーネントも保持
interface EmailTemplateProps {
    firstName: string;
}