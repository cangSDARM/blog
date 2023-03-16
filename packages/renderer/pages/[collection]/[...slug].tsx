import React from "react";
import {
  getAllPosts,
  collectionOverview,
  PostAst,
  getPostBySlug,
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
import { allPosts } from "contentlayer/generated";

type PageProps = {
  post: PostAst;
  compiled: CompileAst;
};

const MdxImage: React.FC<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >
> = (props) => {
  const tSrc = React.useMemo(() => {
    if (!props.src) return "";

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
          {/* @ts-ignore */}
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
    console.warn("not found", params, post);
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
    },
  };
}

export function getStaticPaths() {
  const paths = getAllPosts().map((p) => {
    return {
      params: { slug: p.slug, collection: p.collection },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
