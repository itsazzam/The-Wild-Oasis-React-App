import supabase, { supabaseUrl } from "./supabase";
import { toast } from "react-hot-toast";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    throw new Error("Cabins could not get loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    throw new Error("Cabin could not get deleted");
  }

  return data;
}

export async function createEditCabin(cabin, id) {
  const hasImage = cabin.image?.startsWith?.(supabaseUrl);

  // 1. generate a random image name
  const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll("/", "");

  // 2. generate the image url and pass it
  // https://xlsuuycenmbfasnlnxip.supabase.co/storage/v1/object/public/cabins-images/cabin-001.jpg?t=2024-03-12T01%3A35%3A41.039Z
  // https://xlsuuycenmbfasnlnxip.supabase.co/storage/v1/object/public/cabins-images/cabin-001.jpg?t=2024-03-12T01%3A35%3A41.039Z
  const imageUrl = hasImage
    ? cabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;

  let query = supabase.from("cabins");

  if (!id) query = query.insert([{ ...cabin, image: imageUrl }]);

  if (id) query = query.update({ ...cabin, image: imageUrl }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error("Cabin could not get created");
  }

  // 3. upload the image to the storage

  if (hasImage) return data;

  const { error: storageError } = await supabase.storage
    .from("cabins-images")
    .upload(imageName, cabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    toast.Error("Image could not get uploaded");
    throw new Error("Image could not get uploaded");
  }
  return data;
}

// dublicating cabins
