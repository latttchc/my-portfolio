"use client";

import { Mail, Github, Twitter } from "lucide-react";
import ContactItem from "@/components/ContactItem";

export default function ContactPage() {
    return (
        <div className="max-w-xl mx-auto px-4 py-10 space-y-6 text-white">
            <h1 className="text-3xl font-bold">Contact</h1>
            <p className="text-white/80">
                お問い合わせ・ご連絡は以下のSNSまたはメールからお願いします。
            </p>

            <div className="flex flex-row items-center mx-auto gap-4 mt-6">
                <ContactItem
                    icon={<Mail className="w-5 h-5" />}
                    label="Mail"
                    href="mailto:iam.yuk2882@gmail.com"
                />
                <ContactItem
                    icon={<Github className="w-5 h-5" />}
                    label="GitHub"
                    href="https://github.com/latttchc"
                />
                <ContactItem
                    icon={<Twitter className="w-5 h-5" />}
                    label="X / (Twitter)"
                    href="https://x.com/elif_lattt"
                />
            </div>
        </div>
    );
}