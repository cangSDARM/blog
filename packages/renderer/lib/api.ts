import { readdirSync } from "fs";
import { join, relative, sep } from "path";
import matter from "gray-matter";
import { compareAsc } from "date-fns";
import _ from "lodash";

export type PostAst = {
  absPath: string;
  collection: string;
  type: string;
  url: string;
  slug: string[];
  matter: Frontmatter;
};

const MDX_DIR = join(process.cwd(), "mdx");
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

export function getAllCollections() {
  return collections;
}

export function getAllPosts() {
  return post;
}

let overviews: {
  posts: PostAst[];
  name: string;
}[] = [];
export function collectionOverview() {
  if (overviews.length > 0) return overviews;

  overviews = getAllCollections().map((coll) => ({
    posts: getPostInCollection(coll),
    name: coll,
  }));

  return overviews;
}

const postInCollectionMap = new Map<string, PostAst[]>();
export function getPostInCollection(collection: string) {
  if (postInCollectionMap.has(collection)) {
    return postInCollectionMap.get(collection) as PostAst[];
  }

  const result = post
    .filter((p) => p.collection === collection)
    .sort((a, b) =>
      compareAsc(new Date(a.matter.date), new Date(b.matter.date))
    )
    .sort((a, b) => (a.matter.title || "").localeCompare(b.matter.title || ""))
    .sort(
      (a, b) => (a.matter.index || Infinity) - (b.matter.index || Infinity)
    );

  postInCollectionMap.set(collection, result);

  return result;
}

export function getPostBySlug(slug: string[], collection: string) {
  return post.find(
    (p) =>
      _.difference(p.slug, slug).length === 0 && p.collection === collection
  );
}
