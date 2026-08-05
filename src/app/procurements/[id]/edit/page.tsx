import Link from "next/link";
import { notFound } from "next/navigation";
import ProcurementForm from "@/components/ProcurementForm";
import { createClient } from "@/lib/supabase/server";
import { updateProcurement } from "../../actions";

type EditProcurementPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProcurementPage({
  params,
}: EditProcurementPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: procurement, error } = await supabase
    .from("procurements")
    .select("id, title, status")
    .eq("id", id)
    .single();

  if (error || !procurement) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl p-8">
      <Link
        href={`/procurements/${id}`}
        className="text-sm font-medium underline"
      >
        ← Back to procurement
      </Link>

      <div className="mt-6 rounded-lg border p-6">
        <h1 className="mb-8 text-3xl font-bold">Edit procurement</h1>

        <ProcurementForm
          procurement={procurement}
          action={updateProcurement}
          submitLabel="Save changes"
        />
      </div>
    </main>
  );
}
