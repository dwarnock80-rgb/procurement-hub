import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type ProcurementPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProcurementPage({
  params,
}: ProcurementPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: procurement, error } = await supabase
    .from("procurements")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !procurement) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl p-8">
      <Link
        href="/"
        className="mb-6 inline-block text-sm font-medium underline"
      >
        ← Back to dashboard
      </Link>

      <div className="rounded-lg border p-6">
        <h1 className="text-3xl font-bold">{procurement.title}</h1>

        <dl className="mt-8 space-y-5">
          <div>
            <dt className="text-sm font-semibold text-zinc-500">Status</dt>
            <dd className="mt-1">{procurement.status ?? "Not set"}</dd>
          </div>

          <div>
            <dt className="text-sm font-semibold text-zinc-500">
              Procurement ID
            </dt>
            <dd className="mt-1">{procurement.id}</dd>

            <Link
  href={`/procurements/${procurement.id}/edit`}
  className="inline-block rounded-md bg-black px-4 py-2 text-white"
>
  Edit procurement
</Link>
          </div>
        </dl>
      </div>
    </main>
  );
}
