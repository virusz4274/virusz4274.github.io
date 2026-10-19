import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
const read = path => readFileSync(`dist/${path}`, "utf8");
const homepage = read("index.html");
assert.match(homepage, /Harisankar/);
assert.ok(homepage.indexOf('id="selected-projects"') < homepage.indexOf('id="writing"'));
for (const [slug, title, url] of [["tipkaro", "TipKaro", "https://example.com/tipkaro"], ["callery", "Callery", "https://example.com/callery"], ["hermes-phone", "Hermes Phone", "https://github.com/virusz4274/hermes-phone-hfp"]]) {
  assert.match(homepage, new RegExp(title));
  assert.ok(read(`projects/${slug}/index.html`).includes(url));
}
assert.match(read("links/index.html"), /Chaotic-aur/);
assert.match(read("about/index.html"), /harisankar@coarde.com/);
assert.match(read("projects/index.html"), /Callery/);
assert.doesNotMatch(read("projects/index.html") + read("links/index.html"), /snapbackup|Snap backup|discord-rich-presence|Discord rich presence/i);
for (const slug of ["snapbackup", "discord-rich-presence"]) {
  assert.ok(!existsSync(`dist/projects/${slug}/index.html`));
}
assert.match(read("posts/index.html"), /No articles yet/);
for (const path of ["posts/2023/06/hacks/index.html", "hacks.html", "hacks.zip"]) {
  assert.ok(!existsSync(`dist/${path}`), `Removed prank must not be published: ${path}`);
}
assert.doesNotMatch(homepage + read("rss.xml"), /Universal hack/);
for (const path of ["paypal.html", "akefredirect.html", "CNAME"]) {
  assert.deepEqual(readFileSync(`dist/${path}`), readFileSync(`public/${path}`));
}
assert.ok(existsSync("dist/pagefind/pagefind.js"));
process.stdout.write("Build smoke checks passed: migrated pages, tags, showcase, TOC, search, and legacy assets.\n");
