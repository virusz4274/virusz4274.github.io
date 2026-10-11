import assert from "node:assert/strict";
import { mkdirSync, writeFileSync, readFileSync, rmSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
const blog = "src/content/blog/2000/01/content-verification";
const projects = "src/content/projects/content-verification";
const build = () => execFileSync("npm", ["run", "build"], { stdio: "inherit", env: { ...process.env, ASTRO_TELEMETRY_DISABLED: "1" } });
const read = path => readFileSync(`dist/${path}/index.html`, "utf8");
assert.ok(!existsSync(blog) && !existsSync(projects), "Verification paths must be unused");
try {
  mkdirSync(blog, { recursive: true });
  mkdirSync(projects);
  const content = `---
title: Content verification
pubDatetime: 2000-01-01T00:00:00Z
description: Temporary integration fixture.
tags: [tech, cameras, vehicles, business, unexpected-topic]
---

## First section

### Nested section

\`\`\`typescript
const topic = "flexible";
\`\`\`
`;
  writeFileSync(`${blog}/post.md`, content);
  writeFileSync(`${blog}/draft.md`, content.replace("title: Content verification", "title: Hidden draft\ndraft: true"));
  writeFileSync(`${blog}/future.md`, content.replace("2000-01-01", "2999-01-01"));
  writeFileSync(`${projects}/project.md`, `---\ntitle: Project verification\ndescription: Temporary project fixture.\ntags: [unexpected-topic]\n---\n\n## Project section\n\n\`\`\`js\nconst project = true;\n\`\`\`\n`);
  build();
  const post = read("posts/2000/01/content-verification/post");
  assert.match(post, /class="astro-code/);
  assert.match(post, /--shiki-dark/);
  assert.match(post, /href="#first-section"/);
  assert.match(post, /href="#nested-section"/);
  assert.match(post, /id="first-section"/);
  for (const tag of ["tech", "cameras", "vehicles", "business", "unexpected-topic"]) {
    assert.match(read(`tags/${tag}`), /Content verification/);
  }
  assert.ok(!existsSync("dist/posts/2000/01/content-verification/draft/index.html"));
  assert.ok(!existsSync("dist/posts/2000/01/content-verification/future/index.html"));
  assert.match(read("projects/content-verification/project"), /href="#project-section"/);
  assert.match(read("projects/content-verification/project"), /class="astro-code/);
  assert.match(readFileSync("dist/rss.xml", "utf8"), /posts\/2000\/01\/content-verification\/post/);
  process.stdout.write("Content integration checks passed: nested paths, arbitrary tags, Shiki, TOC, projects, draft and schedule filtering, RSS.\n");
} finally {
  rmSync(blog, { recursive: true, force: true });
  rmSync(projects, { recursive: true, force: true });
  build();
}
