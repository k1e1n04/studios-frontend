"use client";
import { NoAuthLayout } from "@/templates/NoAuthLayout";


export default function Page() {
    return (
        <NoAuthLayout>
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center justify-center">
                        <svg
                            className="h-16 w-16 text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                        <p>
                            Studyoにご登録いただきありがとうございます！<br/>
                            ご登録いただいたメールアドレスに確認メールを送信しました。<br/>
                            メール内のリンクをクリックして、アカウントを有効化してください。
                        </p>
                    </div>
                </div>
            </div>
        </NoAuthLayout>

    );
}