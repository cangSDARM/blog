import { compareAsc } from "date-fns";
import _ from "lodash";
import { allPosts, Post } from "contentlayer/generated";

export interface PostAst extends Omit<Post, "extra_info"> {
  absPath: string;
  collection: string;
  url: string;
  slug: string[];
}

function contentCustomPost(post: Post): PostAst {
  const { extra_info, ...rest } = post;
  return { ...rest, ...extra_info };
}

const collections: string[] = [];
export function getAllCollections() {
  if (collections.length > 0) return collections;

  allPosts.map(contentCustomPost).forEach((post) => {
    if (!collections.includes(post.collection)) collections.push();
  });

  return collections;
}

export function getAllPosts() {
  return allPosts.map(contentCustomPost);
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

  const result = allPosts
    .map(contentCustomPost)
    .filter((p) => p.collection === collection)
    .sort((a, b) =>
      compareAsc(new Date(a.date), new Date(b.date))
    )
    .sort((a, b) => (a.title || "").localeCompare(b.title || ""));
  .sort(
    (a, b) => (a.index || Infinity) - (b.index || Infinity)
  );

  postInCollectionMap.set(collection, result);

  return result;
}

export function getPostBySlug(slug: string[], collection: string) {
  return allPosts
    .map(contentCustomPost)
    .find(
      (p) =>
        _.difference(p.slug, slug).length === 0 && p.collection === collection
    );
}
