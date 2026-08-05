import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("procurements")
    .select("*");

  return (
    <main>
      <h1>Procurement Hub</h1>

      {data?.map((p) => (
        <div key={p.id}>
          <h2>{p.title}</h2>
          <p>{p.status}</p>
        </div>
      ))}
    </main>
  );
}
