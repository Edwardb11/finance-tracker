"use client";

import SignIn from "@/components/SignIn/SignIn";
import { useAuth } from "@/lib/store/auth-context";

export default function Home() {
  const { user } = useAuth();

  if (!user) {
    return <SignIn />;
  }

  return (
    <>
      <main className="container max-w-2xl px-6 mx-auto">
        <section className="py-3">
          <small className="text-gray-400 text-md">My Balance</small>
        </section>

        <section className="flex items-center gap-2 py-3">
          <button className="btn btn-primary">+ Expenses</button>
          <button className="btn btn-primary-outline">+ Income</button>
        </section>

        <section className="py-6">
          <h3 className="text-2xl">My Expenses</h3>
          <div className="flex flex-col gap-4 mt-6">DATA</div>
        </section>
      </main>
    </>
  );
}
