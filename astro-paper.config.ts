import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://virusz4274.tech/",
    title: "Harisankar",
    description: "Harisankar — building products and the systems that keep them running.",
    author: "Harisankar",
    profile: "https://github.com/virusz4274",
    lang: "en",
    timezone: "Asia/Kolkata",
  },
  features: {
    dynamicOgImage: false,
    editPost: { enabled: false },
    search: "pagefind",
  },
  socials: [
    { name: "github", url: "https://github.com/virusz4274" },
    { name: "telegram", url: "https://t.me/virusz4274" },
    { name: "mail", url: "mailto:harisankar@coarde.com" },
  ],
});
