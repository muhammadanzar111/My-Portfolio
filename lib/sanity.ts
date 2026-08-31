import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "30cxkf1b";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-01-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => {
  if (!source) return { width: () => ({ url: () => "" }) } as any;
  return builder.image(source);
};

// --- Resilient typed queries with safe fallback handling ---

export async function getAbout() {
  try {
    return await client.fetch(
      `*[_type == "about"][0]{ bio, headline, education, resumeUrl }`,
      {},
      { next: { tags: ["linkedin-data"] } }
    );
  } catch (err) {
    console.warn("Could not fetch about from Sanity:", err);
    return null;
  }
}

export async function getSkills() {
  try {
    return await client.fetch(
      `*[_type == "skill"] | order(order asc){ _id, name, category, level }`,
      {},
      { next: { tags: ["linkedin-data"] } }
    );
  } catch (err) {
    console.warn("Could not fetch skills from Sanity:", err);
    return [];
  }
}

export async function getCertifications() {
  try {
    return await client.fetch(
      `*[_type == "certification"] | order(issueDate desc){
        _id, name, issuer, issueDate, credentialUrl, logo
      }`,
      {},
      { next: { tags: ["linkedin-data"] } }
    );
  } catch (err) {
    console.warn("Could not fetch certifications from Sanity:", err);
    return [];
  }
}

export async function getExperience() {
  try {
    return await client.fetch(
      `*[_type == "experience"] | order(startDate desc){
        _id, role, company, startDate, endDate, summary, skills
      }`,
      {},
      { next: { tags: ["linkedin-data"] } }
    );
  } catch (err) {
    console.warn("Could not fetch experience from Sanity:", err);
    return [];
  }
}

export async function getProjects() {
  try {
    return await client.fetch(
      `*[_type == "project"] | order(order asc){
        _id, title, description, techSkills, liveUrl, timeframe, coverImage, gallery
      }`,
      {},
      { next: { tags: ["linkedin-projects"] } }
    );
  } catch (err) {
    console.warn("Could not fetch projects from Sanity:", err);
    return [];
  }
}
