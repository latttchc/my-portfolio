"use client";
import { formSchema } from "@/server/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Github, Twitter } from "lucide-react";
import ContactItem from "@/components/ContactItem";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      text: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        form.reset();
      } else {
        throw new Error(result.error || 'メール送信に失敗しました');
      }

    } catch (error) {
      console.error('送信エラー:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }

    // 5秒後にメッセージを自動削除
    setTimeout(() => {
      setSubmitStatus('idle');
    }, 5000);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10 space-y-6 text-white">
      <h1 className="text-3xl font-bold">Contact</h1>
      <p className="text-white/80">
        お問い合わせ・ご連絡は以下のフォームからお願いします。
      </p>

      <div className="flex flex-row items-center justify-center mx-auto gap-4 -mt-3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center mt-12"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mt-2.5">
                  <FormLabel>名前</FormLabel>
                  <FormControl className="mb-3.5">
                    <Input
                      className="w-84 bg-black"
                      type="text"
                      placeholder="必須"
                      required
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 -mt-5" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mt-2.5">
                  <FormLabel>mail</FormLabel>
                  <FormControl className="mb-3.5">
                    <Input
                      className="w-84 bg-black"
                      type="email"
                      placeholder="必須"
                      required
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 -mt-5" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="mt-2.5">
                  <FormLabel>電話番号</FormLabel>
                  <FormControl className="mb-3.5">
                    <Input
                      className="w-84 bg-black"
                      type="tel"
                      placeholder="任意"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 -mt-5" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem className="mt-2.5">
                  <FormLabel>お問い合せ内容</FormLabel>
                  <FormControl className="mb-3.5">
                    <Textarea
                      className="w-84 bg-black"
                      placeholder="100文字まで入力できます"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 -mt-5" />
                </FormItem>
              )}
            />

            {/* 送信状態のフィードバック */}
            {submitStatus === "success" && (
              <div className="text-green-500 bg-blue-900/20 border border-blue-400/20 rounded-lg p-4 text-center">
                📩 送信完了しました。
              </div>
            )}

            {submitStatus === "error" && (
              <div className="text-red-400 bg-red-900/20 border border-red-400/20 rounded-lg p-4 text-center">
                ❌ 送信に失敗しました。もう一度お試しください。
              </div>
            )}

            <Button
              className="bg-blue-950 hover:bg-blue-900 w-84 mt-2"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  送信中...
                </>
              ) : (
                "送信"
              )}
            </Button>
          </form>
        </Form>
      </div>
      <p className="text-white/80 mt-12">
        以下からX(Twiter)・Githubにアクセスできます
      </p>
      <div className="flex flex-row items-center mx-auto gap-4">
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
