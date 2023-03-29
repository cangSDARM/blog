import { collectionOverview, getTagsInCollection } from "@/lib/api";
import { compareAsc } from "date-fns";
import React from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { RxRowSpacing, RxCross2 } from "react-icons/rx";
import styles from "@/styles/tag.module.scss";
import Meta from "@/components/Meta";
import Layout, { injectLayoutContext } from "@/components/Layout";
import Link from "next/link";
import Truncate from "@/components/Truncate";

function postSort(posts: Tag[]) {
  const result = posts
    .sort((a, b) =>
      compareAsc(new Date(a.matter?.date), new Date(b.matter?.date))
    )
    .sort((a, b) =>
      (a.matter?.title || "").localeCompare(b.matter?.title || "")
    )
    .sort(
      (a, b) => (a.matter?.index || Infinity) - (b.matter?.index || Infinity)
    );

  return result;
}

export default injectLayoutContext<{
  tag: string;
  posts: Tag[];
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
              {postSort(posts).map((post) => (
                <Link
                  key={post.url}
                  href={post.url}
                  className={styles.PostItem}
                >
                  <Truncate>{post.matter?.title}</Truncate>
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

  const posts = getTagsInCollection(tag);

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
  const overview = collectionOverview();

  const paths = overview.map((over) => ({
    params: { tag: over.name },
  }));

  return {
    paths,
    fallback: false,
  };
}
