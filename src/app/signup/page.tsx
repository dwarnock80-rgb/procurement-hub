import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SignupForm } from "./signup-form";

export default async function SignupPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-8 py-16">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Create account</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Register for Procurement Hub
          </p>
        </div>

        <SignupForm />

        <p className="text-center text-sm">
          <Link href="/" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400">
            Back to home
          </Link>
        </p>
      </div>
    </main>
  );
}
