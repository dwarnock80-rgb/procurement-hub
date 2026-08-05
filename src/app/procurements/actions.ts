"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createProcurement(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim();

  if (!title) {
    throw new Error("A procurement title is required.");
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("procurements")
    .insert({
      title,
      status,
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(`Unable to create procurement: ${error.message}`);
  }

  revalidatePath("/");
  redirect(`/procurements/${data.id}`);
}

export async function updateProcurement(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim();

  if (!id) {
    throw new Error("The procurement ID is missing.");
  }

  if (!title) {
    throw new Error("A procurement title is required.");
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("procurements")
    .update({
      title,
      status,
    })
    .eq("id", id);

  if (error) {
    throw new Error(`Unable to update procurement: ${error.message}`);
  }

  revalidatePath("/");
  revalidatePath(`/procurements/${id}`);
  redirect(`/procurements/${id}`);
}
