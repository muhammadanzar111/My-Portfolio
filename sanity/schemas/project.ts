import { defineType, defineField } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "techSkills", title: "Tech / Skills", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "liveUrl", title: "Live URL", type: "url" }),
    defineField({ name: "timeframe", title: "Timeframe", type: "string", description: "e.g. 2025 – Present" }),
    defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "gallery", title: "Gallery", type: "array", of: [{ type: "image" }] }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
});
