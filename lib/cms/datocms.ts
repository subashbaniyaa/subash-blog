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
  content: {
    value: StructuredTextDocument;
    links?: any[];
    blocks?: any[];
  } | null;
  profilepicture?: {
    blurhash?: string;
    alt?: string;
    url: string;
    blurUpThumb?: string;
  } | null;
}

// Fetch about info (works for single or collection model)
export async function getAbout(preview: boolean) {
  const data = await fetchAPI(
    `
    query AboutQuery {
      about: about {
        name
        title
        updatedAt
        content {
          value
          links {
            __typename
            ... on PageRecord {
              id
              slug
            }
          }
          blocks {
            __typename
            ... on ImageBlockRecord {
              id
              image {
                url
                alt
              }
            }
          }
        }
        profilepicture {
          blurhash
          alt
          url
          blurUpThumb
        }
      }

      aboutPage: aboutPage {
        name
        title
        updatedAt
        content {
          value
        }
        profilepicture {
          url
          alt
        }
      }

      allAbouts {
        name
        title
        updatedAt
        content {
          value
        }
        profilepicture {
          url
          alt
        }
      }
    }
  `,
    { preview }
  );

  // Handle whichever exists
  const about =
    data?.about || data?.aboutPage || (data?.allAbouts?.length ? data.allAbouts[0] : null);

  if (!about) return null;

  return about as About;
}
