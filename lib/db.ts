import { getAllFilesFrontMatter } from "./mdx";
import { GuestBookEntry } from "./types/guestbook";
import { Skill, SkillCategory } from "./types/skill";
import { User } from "./types/user";

// ---------- Mock Data ----------

// Users
const users: User[] = [
  { id: "user1", name: "Alice", image: "/images/alice.png" },
  { id: "user2", name: "Bob", image: "/images/bob.png" },
];

// Skills and Categories
const skillCategoriesMock: SkillCategory[] = [
  {
    name: "Frontend",
    skills: [
      {
        id: "101",
        name: "React",
        users: [users[0], users[1]],
      },
      {
        id: "102",
        name: "Tailwind CSS",
        users: [],
      },
    ],
  },
  {
    name: "Backend",
    skills: [
      {
        id: "201",
        name: "Node.js",
        users: [],
      },
    ],
  },
];

// Guestbook entries
const guestbookEntriesMock: GuestBookEntry[] = [
  {
    id: "1",
    body: "Great blog!",
    updated_at: new Date().toISOString(),
    user: users[0],
  },
  {
    id: "2",
    body: "Very informative.",
    updated_at: new Date().toISOString(),
    user: users[1],
  },
];

// ---------- Functions ----------

export async function getAllBlogPosts() {
  try {
    const posts = await getAllFilesFrontMatter("blog");
    return posts;
  } catch (error) {
    console.error("Error getting blogs: ", error);
    return [];
  }
}

export async function getAllSkillsByCategory(): Promise<SkillCategory[]> {
  try {
    // Return mock data instead of querying Prisma
    return skillCategoriesMock;
  } catch (error) {
    console.error("Error getting skills: ", error);
    return [];
  }
}

export async function getGuestbookEntries(): Promise<GuestBookEntry[]> {
  try {
    // Return mock data instead of querying Prisma
    return guestbookEntriesMock;
  } catch (error) {
    console.error("Error getting guestbook entries: ", error);
    return [];
  }
}
