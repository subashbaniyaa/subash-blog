"use server";

import { auth } from "auth";
import { revalidatePath } from "next/cache";

// In-memory guestbook storage
let guestbookEntries: {
  id: number;
  body: string;
  userId: string;
  createdAt: Date;
}[] = [];

/**
 * Delete a guestbook entry
 */
export const deleteEntry = async (
  prevState: { message: string },
  formData: FormData
) => {
  try {
    const id = Number(formData.get("id"));
    const entry = guestbookEntries.find((e) => e.id === id);

    if (!entry) {
      return { message: "The entry could not be found" };
    }

    const session = await auth();
    if (!session?.user) {
      return { message: "Unauthenticated" };
    }

    if (session.user.id !== entry.userId) {
      return { message: "Unauthorized" };
    }

    guestbookEntries = guestbookEntries.filter((e) => e.id !== id);

    revalidatePath("/endorsements");

    return { message: "Success! The entry has been deleted." };
  } catch (error) {
    console.error(error);
    return { message: "Failed to delete the entry." };
  }
};

/**
 * Add a new guestbook entry
 */
export const addEntry = async (
  prevState: { message: string },
  formData: FormData
) => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { message: "Unauthorized" };
    }

    const body = (formData.get("body") || "").toString().slice(0, 500);

    const newEntry = {
      id: guestbookEntries.length + 1,
      body,
      userId: session.user.id,
      createdAt: new Date(),
    };

    guestbookEntries.push(newEntry);

    console.debug("New entry created: ", newEntry);

    revalidatePath("/endorsements");

    return { message: "Success! The entry has been added." };
  } catch (error) {
    console.error(error);
    return { message: "Failed to add the entry." };
  }
};
