import Link from "next/link";
import ProcurementForm from "@/components/ProcurementForm";
import { createProcurement } from "../actions";

export default function NewProcurementPage() {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <Link href="/" className="text-sm font-medium underline">
        ← Back to dashboard
      </Link>

      <div className="mt-6 rounded-lg border p-6">
        <h1 className="mb-8 text-3xl font-bold">New procurement</h1>

        <ProcurementForm
          action={createProcurement}
          submitLabel="Create procurement"
        />
      </div>
    </main>
  );
}
