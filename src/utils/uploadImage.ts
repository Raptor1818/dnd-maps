import { supabase } from '@/lib/supabaseClient'

export async function uploadMapImage(file: File) {
  const filePath = `${Date.now()}-${file.name}`

  const { data, error } = await supabase.storage
    .from("dnd-maps")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  console.log("Upload Data:", data);
  console.error("Upload Error:", error);


  if (error) throw error

  const publicUrl = supabase
    .storage
    .from("dnd-maps")
    .getPublicUrl(filePath).data.publicUrl;

  return publicUrl
}
