import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: procurements, error } = await supabase
  .from("procurements")
  .select("*")
  .order("created_at", { ascending: false });

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="flex flex-1 flex-col gap-6 px-8 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <Link href="/" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400">
          Home
        </Link>
      </div>

      <p className="text-zinc-600 dark:text-zinc-400">
        Signed in as <span className="font-medium text-zinc-900 dark:text-zinc-100">{user.email}</span>
      </p>

      <pre>
  {JSON.stringify(procurements, null, 2)}
</pre>

      <form action="/logout" method="post">
        <button
          type="submit"
          className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
        >
          Sign out
        </button>
      </form>
    </main>
  );
}
