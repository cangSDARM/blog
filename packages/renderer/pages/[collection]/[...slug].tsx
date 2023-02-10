import React from "react";
import {
  collectionOverview,
  getAllPosts,
  getPostBySlug,
  PostAst,
} from "@/lib/api";
import { compileMdx } from "@/lib/compile";
import useMdxRenderer from "@/hooks/useMdxRenderer";
import Image from "@/components/Image";
import Layout, { injectLayoutContext } from "@/components/Layout";
import Meta from "@/components/Meta";
import _ from "lodash";
import useTemplateRender from "@/components/Templates/useTemplate";
import Link from "next/link";
import styles from "@/styles/collection.slug.module.scss";

type PageProps = {
  post: PostAst;
  compiled: CompileAst;
};

const MdxImage = (props: any) => {
  const tSrc = React.useMemo(() => {
    const rep = /^.+(\/images\/.*)$/giu.exec(props.src);

    if (rep) {
      console.warn(
        "please replace the src of the image with the beginning of /images"
      );
      return rep[1];
    }

    return props.src;
  }, [props.src]);

  return (
    <span role="figure">
      <span
        className="gatsby-resp-image-wrapper"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Link
          href={tSrc}
          target="_blank"
          rel="noopener"
          style={{ display: "block" }}
        >
          <Image {...props} src={tSrc} ext={""} />
        </Link>
      </span>
      <span role="figcaption">{props.title || props.alt}</span>
    </span>
  );
};

export default injectLayoutContext(function Page({
  post,
  compiled: { content, ...compiled },
}: PageProps) {
  const [Component, frontmatter] = useMdxRenderer({ code: content });
  const [Renderer] = useTemplateRender(post.collection);

  return (
    <>
      <Meta
        title={frontmatter.title}
        titleTemplate={`%s | ${_.capitalize(post.collection)}`}
      />
      <Layout theme="light">
        <div className={styles.Root}>
          <Renderer frontmatter={frontmatter} compiled={compiled}>
            {(components) => (
              <Component
                components={{
                  img: MdxImage,
                  ...components,
                }}
              />
            )}
          </Renderer>
        </div>
      </Layout>
    </>
  );
});

export async function getStaticProps({ params }: any) {
  const { slug, collection } = params;
  const post = getPostBySlug(slug, collection);
  const overview = collectionOverview();

  if (!post) {
    return {
      notFound: true,
    };
  }

  const compiled = await compileMdx(post.absPath);

  return {
    props: {
      post,
      compiled,
      overview,
    } as PageProps,
  };
}

export function getStaticPaths() {
  const posts = getAllPosts();

  const paths = posts.map((p) => {
    return {
      params: { slug: p.slug, collection: p.collection },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
