import { readdirSync } from "fs";
import { join, relative, sep } from "path";
import matter from "gray-matter";
import _ from "lodash";

export type PostAst = {
  absPath: string;
  collection: string;
  type: string;
  url: string;
  slug: string[];
  matter: Frontmatter;
};

const cwdPath = (path: string) => join(process.cwd(), path);

const MDX_DIR = cwdPath("mdx");
const DEFAULT_COLLECTION = "blog";
const RESERVED_NAMES = ["tags", "tag", "_debug"];
const FILE_EXTENSIONS = ["md", "mdx"];

function slugPath(path: string) {
  return relative(MDX_DIR, path).replace(sep, "/");
}
function fileExt(path: string): [string, string] {
  const reg = /^(?<name>.*)\.(?<ext>.*)$/giu;

  const result = reg.exec(path);
  if (result) {
    return [result.groups!.name, result.groups!.ext];
  } else {
    return [path, ""];
  }
}
function postMatter(path: string) {
  try {
    const { data } = matter.read(path);

    return data;
  } catch (e) {
    console.warn("cannot read matter in %s", path, e);
  }
}

function readPosts(dir: string, root = true) {
  readdirSync(dir, { withFileTypes: true }).forEach((dirent) => {
    const path = join(dir, dirent.name);

    if (dirent.isDirectory()) {
      if (RESERVED_NAMES.includes(dirent.name)) {
        console.warn(`${dirent.name} is a reserved name. it will not process`);
        return;
      }

      if (root) {
        collections.push(dirent.name);
      }
      readPosts(path, false);
    } else {
      const [name, ext] = fileExt(dirent.name);

      if (!FILE_EXTENSIONS.includes(ext)) {
        console.warn(
          `${dirent.name} will not be processed, ${ext} is not a legal extension`
        );
        return;
      }

      const fm = postMatter(path);
      const url = (slugPath(dir) || DEFAULT_COLLECTION) + "/" + name;
      const [collection, ...slug] = url.split("/");

      post.push({
        matter: fm as any,
        absPath: path,
        type: ext,
        slug,
        collection,
        url: "/" + url,
      });
    }
  });
}

const post: PostAst[] = [];
const collections: string[] = [];
readPosts(MDX_DIR);

export function getAllPosts() {
  return post;
}

let overviews: Overview[] = [];

const staticPosts: Tag[] = [];
const staticOverviews: Overview[] = [];

function getStatics(collection: string) {
  const idx = staticOverviews.push({ name: collection, length: 0 }) - 1;
  readdirSync(cwdPath("pages/" + collection), { withFileTypes: true }).forEach(
    (dirent) => {
      if (dirent.isDirectory()) return;
      staticOverviews[idx].length += 1;
      const [name] = fileExt(dirent.name);
      staticPosts.push({
        url: "/" + collection + "/" + name,
        matter: { title: name },
        collection: collection,
      });
    }
  );
}
getStatics("xargs");

export function collectionOverview() {
  if (overviews.length > 0) return overviews;

  overviews = collections
    .map((coll) => ({
      length: getTagsInCollection(coll).length,
      name: coll,
    }))
    .concat(staticOverviews);

  return overviews;
}

export function getTagsInCollection(tag: string): Tag[] {
  const result = post.filter((p) => p.collection === tag);

  if (result.length === 0) {
    return staticPosts.filter((p) => p.collection === tag);
  }

  return result;
}

export function getPostBySlug(slug: string[], collection: string) {
  return post.find(
    (p) =>
      _.difference(p.slug, slug).length === 0 && p.collection === collection
  );
}
