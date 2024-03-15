"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/store/auth-context";

export default function LoadingPage() {
  const router = useRouter();
  const { loading, user } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push("/");
      } else {
        router.push("/auth/login");
      }
    }
  }, [loading, user, router]);

  return <div>Loading...</div>;
};

 
