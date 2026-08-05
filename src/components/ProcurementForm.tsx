type Procurement = {
  id?: number | string;
  title?: string | null;
  status?: string | null;
};

type ProcurementFormProps = {
  procurement?: Procurement;
  action: (formData: FormData) => Promise<void>;
  submitLabel: string;
};

export default function ProcurementForm({
  procurement,
  action,
  submitLabel,
}: ProcurementFormProps) {
  return (
    <form action={action} className="space-y-6">
      {procurement?.id && (
        <input type="hidden" name="id" value={procurement.id} />
      )}

      <div>
        <label
          htmlFor="title"
          className="block text-sm font-semibold text-zinc-700"
        >
          Title
        </label>

        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={procurement?.title ?? ""}
          className="mt-2 w-full rounded-md border border-zinc-300 px-3 py-2"
        />
      </div>

      <div>
        <label
          htmlFor="status"
          className="block text-sm font-semibold text-zinc-700"
        >
          Status
        </label>

        <select
          id="status"
          name="status"
          defaultValue={procurement?.status ?? "Planning"}
          className="mt-2 w-full rounded-md border border-zinc-300 px-3 py-2"
        >
          <option value="Planning">Planning</option>
          <option value="In progress">In progress</option>
          <option value="Evaluation">Evaluation</option>
          <option value="Awarded">Awarded</option>
          <option value="Complete">Complete</option>
          <option value="On hold">On hold</option>
        </select>
      </div>

      <button
        type="submit"
        className="rounded-md bg-black px-5 py-2.5 font-medium text-white hover:bg-zinc-800"
      >
        {submitLabel}
      </button>
    </form>
  );
}
