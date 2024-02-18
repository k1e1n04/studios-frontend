import React from "react";
import { useAuth } from "@/hooks/useAuth";

/**
 * ログアウトボタン
 */
export const LogoutButton: React.FC = () => {
  const { logout } = useAuth();
  return (
    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
      <a
        className="text-sm font-semibold leading-6 text-gray-900"
        onClick={logout}
        style={{ cursor: "pointer" }}
      >
        ログアウト
      </a>
    </div>
  );
};
