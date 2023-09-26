import { supabase } from "./supabase";

export async function deleteExistingImage(
  url: string,
  bucket: string,
  folder: string
) {
  try {
    const urlParts = url.split("/");
    const filePath = urlParts.slice(urlParts.indexOf(folder)).join("/");
    const { data, error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);
      if (error) {
        throw error;
      }
    return data;
  } catch (error) {
    throw error;
  }
}
