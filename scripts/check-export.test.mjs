import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { navigation } from '../content/navigation.ts';
import { resolveSiteConfig } from '../lib/config.mjs';

const root = new URL('../', import.meta.url);
const site = resolveSiteConfig(JSON.parse(readFileSync(new URL('site.config.json', root), 'utf8')), process.env);
const paths = ['/', ...navigation.map(item => item.href)];
const pages = new Map([...paths, '/404.html'].map(path => {
  const filename = path.endsWith('/') ? `${path.slice(1)}index.html` : path.slice(1);
  const html = readFileSync(new URL(`out/${filename}`, root), 'utf8');
  return [path, html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')];
}));

test('exported pages use enquiry wording and mention the public email', () => {
  for (const [path, html] of pages) {
    const visible = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
    assert.doesNotMatch(visible, /\b(?:order placed|reserved|booked|paid|confirmed)\b/i, path);
    assert.match(html, /mailto:/, path);
  }
});

test('the public embed host and bootstrap config belong to Contact alone', () => {
  for (const [path, html] of pages) {
    const hosts = html.match(/<jamstacks-support-form(?=[\s>])/g) ?? [];
    assert.equal(hosts.length, path === '/contact/' && site.siteId ? 1 : 0, path);
    if (path !== '/contact/') continue;
    if (site.siteId) {
      assert.ok(html.includes(`data-jamstacks-site="${site.siteId}"`));
      const source = readFileSync(new URL('out/contact/index.html', root), 'utf8');
      assert.ok(source.includes(site.embedUrl));
    } else {
      assert.match(html, /Write to us directly/);
    }
  }
});

test('exported canonical URLs, social images and in-site anchors follow the base path', () => {
  for (const [path, html] of pages) {
    if (paths.includes(path)) assert.match(html, /<title>[^<]+<\/title>/, path);
    if (site.siteUrl && paths.includes(path)) {
      assert.ok(html.includes(`rel="canonical" href="${site.siteUrl}${path}"`), path);
      assert.ok(html.includes(`property="og:image" content="${site.siteUrl}/og.png"`), path);
    }
    for (const [, href] of html.matchAll(/<a\b[^>]* href="(\/[^"]*)"/g)) {
      assert.ok(href.startsWith(`${site.basePath}/`), `${path}: ${href} misses base path`);
      const [target, anchor] = href.slice(site.basePath.length).split('#');
      const destination = pages.get(target);
      assert.ok(destination, `${path}: missing page ${target}`);
      if (anchor) assert.ok(destination.includes(`id="${anchor}"`), `${path}: missing anchor ${href}`);
    }
  }
});

test('sitemap, robots and social art are part of the portable export', () => {
  const sitemap = readFileSync(new URL('out/sitemap.xml', root), 'utf8');
  const robots = readFileSync(new URL('out/robots.txt', root), 'utf8');
  const image = readFileSync(new URL('out/og.png', root));
  assert.equal(image.readUInt32BE(16), 1200);
  assert.equal(image.readUInt32BE(20), 630);
  if (!site.siteUrl) return;
  for (const path of paths) assert.ok(sitemap.includes(`<loc>${site.siteUrl}${path}</loc>`), path);
  assert.ok(robots.includes(`Sitemap: ${site.siteUrl}/sitemap.xml`));
});
