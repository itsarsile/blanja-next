import { supabase } from "./supabase";

export async function fileUploader(f: File, bucket: string, folder: string) {
  try {
    const fileExt = f.name.split(".")[1];
    const fileName = f.name.split(".")[0];

    const { data: uploadedData, error } = await supabase.storage
      .from(bucket)
      .upload(
        `${folder}/${fileName + "-" + Date.now().toString() + "." + fileExt}`,
        f
      );

    if (uploadedData) {
      const { data: url } = await supabase.storage
        .from(bucket)
        .getPublicUrl(uploadedData.path);

        return url.publicUrl
    }
  } catch (error) {
    throw error
  }
}
