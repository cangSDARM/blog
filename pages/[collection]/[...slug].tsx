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
import clsx from "clsx";
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

const MdxImage: React.FC<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >
> = (props) => {
  return (
    <figure role="figure">
      <span
        className="resp-image-wrapper"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Link
          href={props.src || "/"}
          target="_blank"
          rel="noopener"
          style={{ display: "block" }}
        >
          {/* @ts-ignore */}
          <Image {...props} src={props.src || ""} ext={""} />
        </Link>
      </span>
      <figcaption role="figcaption">{props.title || props.alt}</figcaption>
    </figure>
  );
};

const Anchor: React.FC<
  React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
> = ({ href = "/", ...props }) => {
  if (!["/", "#"].includes(href[0])) {
    return (
      <a
        rel="noopener noreferrer external nofollow"
        target="_blank"
        href={href}
        {...props}
      ></a>
    );
  }

  return (
    <Link href={href} scroll={false} legacyBehavior>
      <a {...props}></a>
    </Link>
  );
};

export default injectLayoutContext(function Page({
  post,
  compiled: { content, ...compiled },
}: PageProps) {
  const [Component, frontmatter] = useMdxRenderer({ code: content });
  const [Renderer, rootStyle] = useTemplateRender(post.collection);

  return (
    <>
      <Meta
        title={frontmatter.title}
        titleTemplate={`%s | ${_.capitalize(post.collection)}`}
      />
      <Layout theme="light">
        <div className={clsx(styles.Root, rootStyle)}>
          <Renderer frontmatter={frontmatter} compiled={compiled}>
            {(components) => (
              <Component
                components={{
                  img: MdxImage,
                  a: Anchor,
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
