import supabase, { supabaseUrl } from "./supabase";

export async function signup({ email, password, fullName }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("error", error);
    throw new Error(error.message);
  }

  return data;
}

export async function getUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateUser({ password, avatar, fullName }) {
  // Update password or Fullname
  let updatedData;

  if (password) updatedData = { password };
  if (fullName) updatedData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updatedData);

  if (error) {
    throw new Error(error.message);
  }

  // update avatar
  if (!avatar) return data;

  const filename = `avatar-${data.user.id}--${Math.random()}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filename, avatar);

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  // update the user
  updatedData = {
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${filename}`,
    },
  };

  const { data: updatedUser, error: updateError } =
    await supabase.auth.updateUser(updatedData);

  if (updateError) {
    throw new Error(updateError.message);
  }

  return updatedUser;
}
