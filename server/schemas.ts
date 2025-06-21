import { z } from "zod"

export const formSchema = z.object({
    name: z.string()
        .min(3, "名前は１文字以上入力してください")
        .max(20, "名前は20文字以内でお願いします"),
    email: z.string()
        .email("無効なメールアドレス形式です"),
    phone: z.string()
        .optional()
        .refine(
            (val) => !val || /^[0-9-+().\s]$/.test(val),
            { message: "有効な電話番号を入力してください" }
        ),
    text: z.string()
        .min(5, "5文字以上入力してください")
        .max(150, "150文字以内でお願いします")
})