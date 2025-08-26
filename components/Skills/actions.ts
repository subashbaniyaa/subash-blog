"use server";

import { auth } from "auth";
import { revalidatePath } from "next/cache";

// In-memory endorsements storage
let endorsements: {
  skillId: number;
  userId: string;
  createdAt: Date;
}[] = [];

/**
 * Give an endorsement to a skill
 */
export const giveEndorsement = async (
  prevState: { message: string },
  formData: FormData
) => {
  try {
    const skillId = Number(formData.get("skillId"));
    const session = await auth();

    if (!session?.user?.id) {
      return { message: "Unauthorized" };
    }

    // Prevent duplicate endorsements by same user
    const alreadyEndorsed = endorsements.some(
      (e) => e.skillId === skillId && e.userId === session.user.id
    );

    if (alreadyEndorsed) {
      return { message: "You have already endorsed this skill." };
    }

    // Add new endorsement
    endorsements.push({
      skillId,
      userId: session.user.id,
      createdAt: new Date(),
    });

    revalidatePath("/endorsements");

    return {
      message: `You have successfully endorsed the skill with ID: ${skillId}`,
    };
  } catch (error) {
    console.error(error);
    return { message: "Failed to endorse the skill." };
  }
};
