"use client";
import { formSchema } from "@/server/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Mail, Github, Twitter } from "lucide-react";
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

export default function ContactPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      text: ""
    }
  })


  return (
    <div className="max-w-xl mx-auto px-4 py-10 space-y-6 text-white">
      <h1 className="text-3xl font-bold">Contact</h1>
      <p className="text-white/80">
        お問い合わせ・ご連絡は以下のSNSまたはフォームからお願いします。
      </p>

      <div className="flex flex-row items-center justify-center mx-auto gap-4 mt-6">
        {/* <ContactItem
          icon={<Mail className="w-5 h-5" />}
          label="Mail"
          href="yuki.oishi.rp18@gmail.com"
        /> */}
        <Form {...form}>
          <form className="flex flex-col items-center">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>名前</FormLabel>
                  <FormControl className="mb-3.5">
                    <Input
                      className="w-84 bg-black"
                      type="name"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>mail</FormLabel>
                  <FormControl className="mb-3.5">
                    <Input
                      className="w-84 bg-black"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>電話番号</FormLabel>
                  <FormControl className="mb-3.5">
                    <Input
                      className="w-84 bg-black"
                      type="tel"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>お問い合せ内容</FormLabel>
                  <FormControl className="mb-3.5">
                    <Textarea
                      className="w-84 bg-black"
                      placeholder=""
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="bg-blue-950 hover:bg-blue-900 w-84 mt-2"
              type="submit"
            >
              送信
            </Button>
          </form>
        </Form>

      </div>
      <div className="flex flex-row items-center mx-auto gap-4 mt-6">
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
    </div >
  );
}
