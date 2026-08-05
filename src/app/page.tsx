import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const { data: procurements, error } = await supabase
    .from("procurements")
    .select("*")
    .order("id", { ascending: false });

  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="mb-8 text-3xl font-bold">Procurement Hub</h1>

      {error && (
        <p className="rounded border border-red-300 bg-red-50 p-4 text-red-700">
          Unable to load procurements: {error.message}
        </p>
      )}

      {!error && procurements?.length === 0 && (
        <p>No procurements have been added yet.</p>
      )}

      <div className="space-y-4">
        {procurements?.map((procurement) => (
          <Link
            key={procurement.id}
            href={`/procurements/${procurement.id}`}
            className="block rounded-lg border p-5 transition hover:bg-zinc-50"
          >
            <h2 className="text-xl font-semibold">{procurement.title}</h2>
            <p className="mt-1 text-zinc-600">
              Status: {procurement.status ?? "Not set"}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
