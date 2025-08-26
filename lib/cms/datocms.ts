import { StructuredTextDocument } from "datocms-structured-text-utils";
import { fetchAPI } from "./common";

// Project types
export interface Project {
  id: string;
  title: string;
  description: string;
  projectType: "sideGig" | "hobby" | "product" | "oss";
  ready: boolean;
  url: string;
  cover: {
    url: string;
  };
}

// Fetch all projects
export async function getAllProjects(preview: boolean) {
  const data = await fetchAPI(
    `
    {
      allProjects {
        id
        title
        description
        projectType
        ready
        url
        cover {
          url
        }
      }
    }
  `,
    { preview }
  );

  return data?.allProjects as Project[];
}

// About types
export interface About {
  name: string;
  title: string;
  updatedAt: string;
  content: StructuredTextDocument | null;
  profilepicture?: {
    blurhash?: string;
    alt?: string;
    url: string;
    blurUpThumb?: string;
  } | null;
}

// Fetch about info
export async function getAbout(preview: boolean) {
  const data = await fetchAPI(
    `
    {
      about {
        name
        title
        updatedAt
        content {
          value
        }
        profilepicture {
          blurhash
          alt
          url
          blurUpThumb
        }
      }
    }
  `,
    { preview }
  );

  if (!data?.about) return null;

  return {
    ...data.about,
    content: data.about.content?.value ?? null,
  } as About;
}
