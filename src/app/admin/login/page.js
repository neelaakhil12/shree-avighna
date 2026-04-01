"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin");
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
