import { createContext, useContext, useEffect, useState } from "react";

type SubmissionContextType = {
    showPageLeaveAlert: () => void;
    hidePageLeaveAlert: () => void;
    preventMultipleSubmission: (event: React.FormEvent<HTMLFormElement>) => void;
};

const SubmissionContext = createContext<SubmissionContextType | null>(null);

/**
 * フォームの送信を管理するコンテキストを使用するためのカスタムフック
 */
export const useSubmissionContext = () => {
    const context = useContext(SubmissionContext);
    if (!context) {
        throw new Error("useSubmissionContext must be used within a SubmissionProvider");
    }
    return context;
};


type SubmissionProviderProps = {
    children: React.ReactNode;
};

/**
 * フォームの送信を管理するコンテキストプロバイダー
 * @param children
 * @constructor
 */
export const SubmissionProvider = ({ children }: SubmissionProviderProps) => {
    const submission = useSubmission();
    return (
        <SubmissionContext.Provider value={submission}>
            {children}
        </SubmissionContext.Provider>
    );
};

/**
 * フォームの送信を管理するカスタムフック
 */
const useSubmission = () => {
    const [isShowPageLeaveAlert, setShowPageLeaveAlert] = useState(false);
    const [isSubmitting, setSubmitting] = useState(false);

    /**
     * 2重送信を防止する
     * @param event フォームのイベント
     */
    const preventMultipleSubmission = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setShowPageLeaveAlert(false);

        if (isSubmitting) {
            return;
        }

        const form = event.target as HTMLFormElement;
        if (form.tagName.toUpperCase() !== "FORM") {
            return;
        }

        setSubmitting(true);
        form.submit();
        setSubmitting(false);
    };

    /**
     * ページを離れようとしたときにアラートを表示する
     * @param event ページを離れようとしたときのイベント
     */
    const handleBeforeunload = (event: BeforeUnloadEvent) => {
        if (isShowPageLeaveAlert) {
            event.returnValue = "ページを離れようとしています。よろしいですか？";
        }
    };

    useEffect(() => {
        window.addEventListener("beforeunload", handleBeforeunload);
        return () => window.removeEventListener("beforeunload", handleBeforeunload);
    }, [isShowPageLeaveAlert]);

    return {
        showPageLeaveAlert: () => setShowPageLeaveAlert(true),
        hidePageLeaveAlert: () => setShowPageLeaveAlert(false),
        preventMultipleSubmission,
    };
};