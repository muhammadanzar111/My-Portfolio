import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-01-01",
  useCdn: true, // edge-cached reads; revalidated on demand via tags below
  perspective: "published",
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);

// --- Typed queries, each tagged so revalidateTag() can target them individually ---

export async function getAbout() {
  return client.fetch(
    `*[_type == "about"][0]{ bio, headline, education, resumeUrl }`,
    {},
    { next: { tags: ["linkedin-data"] } }
  );
}

export async function getSkills() {
  return client.fetch(
    `*[_type == "skill"] | order(order asc){ name, category, level }`,
    {},
    { next: { tags: ["linkedin-data"] } }
  );
}

export async function getCertifications() {
  return client.fetch(
    `*[_type == "certification"] | order(issueDate desc){
      _id, name, issuer, issueDate, credentialUrl, logo
    }`,
    {},
    { next: { tags: ["linkedin-data"] } }
  );
}

export async function getExperience() {
  return client.fetch(
    `*[_type == "experience"] | order(startDate desc){
      _id, role, company, startDate, endDate, summary, skills
    }`,
    {},
    { next: { tags: ["linkedin-data"] } }
  );
}

export async function getProjects() {
  return client.fetch(
    `*[_type == "project"] | order(order asc){
      _id, title, description, techSkills, liveUrl, timeframe, coverImage, gallery
    }`,
    {},
    { next: { tags: ["linkedin-projects"] } }
  );
}
