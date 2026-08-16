import { defineType, defineField } from "sanity";

export default defineType({
  name: "certification",
  title: "Certification",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "issuer", title: "Issuing Organization", type: "string" }),
    defineField({ name: "issueDate", title: "Issue Date", type: "date" }),
    defineField({ name: "credentialUrl", title: "Credential URL", type: "url" }),
    defineField({ name: "logo", title: "Issuer Logo", type: "image" }),
  ],
});
