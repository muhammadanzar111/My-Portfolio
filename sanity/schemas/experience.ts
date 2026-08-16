import { defineType, defineField } from "sanity";

export default defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({ name: "role", title: "Role / Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "company", title: "Company", type: "string" }),
    defineField({ name: "startDate", title: "Start Date", type: "date" }),
    defineField({ name: "endDate", title: "End Date", type: "date", description: "Leave empty if current" }),
    defineField({ name: "summary", title: "Impact Summary", type: "text" }),
    defineField({ name: "skills", title: "Skills Used", type: "array", of: [{ type: "string" }] }),
  ],
});
