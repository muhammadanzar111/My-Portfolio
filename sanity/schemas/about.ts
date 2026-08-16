import { defineType, defineField } from "sanity";

export default defineType({
  name: "about",
  title: "About (singleton)",
  type: "document",
  fields: [
    defineField({ name: "headline", title: "Headline", type: "string" }),
    defineField({ name: "bio", title: "Bio", type: "text" }),
    defineField({ name: "education", title: "Education", type: "array", of: [{ type: "object", fields: [
      { name: "school", type: "string" },
      { name: "degree", type: "string" },
      { name: "years", type: "string" },
    ] }] }),
    defineField({ name: "resumeUrl", title: "Resume PDF URL", type: "url" }),
  ],
});
