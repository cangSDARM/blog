import { existsSync, readdirSync, readFileSync, statSync } from "fs";
import { join, relative, sep } from "path";

export type PostAst = {
  name: string;
  absPath: string;
  collection: string;
  type: string;
  url: string;
};

const MDX_DIR = join(process.cwd(), "mdx");
const DEFAULT_COLLECTION = "blog";
const RESERVED_NAMES = ["tags", "tag", "_debug"];

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

function readPosts(dir: string) {
  readdirSync(dir, { withFileTypes: true }).forEach((dirent) => {
    const path = join(dir, dirent.name);

    if (RESERVED_NAMES.includes(dirent.name)) {
      console.warn(`${dirent.name} is a reserved name. it will not process`);
      return;
    }

    if (dirent.isDirectory()) {
      collections.push(dirent.name);
      readPosts(path);
    } else {
      const [name, ext] = fileExt(dirent.name);
      const collectionPath = slugPath(dir) || DEFAULT_COLLECTION;

      post.push({
        name,
        absPath: path,
        type: ext,
        collection: collectionPath,
        url: "/" + collectionPath + "/" + name,
      });
    }
  });
}

const post: PostAst[] = [];
const collections: string[] = [DEFAULT_COLLECTION];
readPosts(MDX_DIR);

export function getAllCollections() {
  return collections;
}

export function getAllPosts() {
  return post;
}

export function collectionOverview() {
  return getAllCollections().map((coll) => ({
    posts: getPostInCollection(coll),
    name: coll,
  }));
}

export function getPostInCollection(collection: string) {
  return post.filter((p) => p.collection === collection);
}

export function getPostBySlug(slug: string, collection: string) {
  return post.find((p) => p.name === slug && p.collection === collection);
}
