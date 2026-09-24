// app/actions/revalidate.ts
'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const revalidateAndRedirect = async (path: string, redirectTo: string) => {
  // Revalidate the path
  if (!path || path.trim() === "") {
    revalidatePath("/",  "layout");
  } else {
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    revalidatePath(`/${cleanPath.trim()}`);
  }
  
  // Redirect after revalidation
  if (redirectTo.startsWith("/")) {
    redirectTo = redirectTo.slice(1);
  }
  redirect(`/${redirectTo}`);
};