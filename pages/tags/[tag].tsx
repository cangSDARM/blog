import {
  collectionOverview,
  getAllCollections,
  getPostInCollection,
  PostAst,
} from "@/lib/api";
import React from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { RxRowSpacing, RxCross2 } from "react-icons/rx";
import styles from "@/styles/tag.module.scss";
import Meta from "@/components/Meta";
import Layout, { injectLayoutContext } from "@/components/Layout";
import Link from "next/link";
import Truncate from "@/components/Truncate";

export default injectLayoutContext<{
  tag: string;
  posts: PostAst[];
}>(function Page({ tag, posts }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Meta />
      <Layout>
        <div className={styles.PageRoot}>
          <Collapsible.Root
            className={styles.CollapsibleRoot}
            open={open}
            onOpenChange={setOpen}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span className={styles.Text}>
                Tag: <span className={styles.Tag}>{tag}</span> starred{" "}
                {posts.length} posts
              </span>
              <Collapsible.Trigger asChild>
                <button className={styles.IconButton}>
                  {open ? <RxCross2 /> : <RxRowSpacing />}
                </button>
              </Collapsible.Trigger>
            </div>

            <Collapsible.Content>
              {posts.map((post: any) => (
                <Link
                  key={post.name}
                  href={post.url}
                  className={styles.PostItem}
                >
                  <Truncate>{post.name}</Truncate>
                </Link>
              ))}
            </Collapsible.Content>
          </Collapsible.Root>
        </div>
      </Layout>
    </>
  );
});

export async function getStaticProps({ params }: any) {
  const { tag } = params;
  const overview = collectionOverview();

  const posts = getPostInCollection(tag);

  if (!posts || posts.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      posts,
      tag,
      overview,
    },
  };
}

export function getStaticPaths() {
  const collection = getAllCollections();

  const paths = collection.map((coll) => ({
    params: { tag: coll },
  }));

  return {
    paths,
    fallback: false,
  };
}
