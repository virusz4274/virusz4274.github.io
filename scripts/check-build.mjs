import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
const read = path => readFileSync(`dist/${path}`, "utf8");
const homepage = read("index.html");
assert.match(homepage, /Harisankar/);
assert.ok(homepage.indexOf('id="selected-projects"') < homepage.indexOf('id="writing"'));
for (const [slug, title] of [["tipkaro", "TipKaro"], ["callery", "Callery"], ["hermes-phone", "Hermes Phone"]]) {
  assert.match(homepage, new RegExp(title));
  assert.match(read(`projects/${slug}/index.html`), new RegExp(`https://example.com/${slug}`));
}
assert.match(read("links/index.html"), /Chaotic-aur/);
assert.match(read("about/index.html"), /harisankar@coarde.com/);
assert.match(read("projects/index.html"), /Snap backup/);
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
