'use client'
import { supabase } from '@/lib/supabaseClient'

export async function uploadMapImage(file: File, filePath: string) {
  const { data, error } = await supabase.storage
    .from("dnd-maps")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Upload Error:", error);
    throw error;
  }

  console.log("Upload Data:", data);

  const publicUrl = supabase
    .storage
    .from("dnd-maps")
    .getPublicUrl(filePath).data.publicUrl;

  return publicUrl
}

export async function deleteMapImage(fileName: string) {
  const { data, error } = await supabase.storage
    .from("dnd-maps")
    .remove([fileName]);

  if (error) {
    console.error("Delete Error:", error);
  } else {
    console.log("Delete Data:", data);
  }

}