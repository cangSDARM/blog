import React from "react";
import {
  collectionOverview,
  getAllPosts,
  getPostBySlug,
  PostAst,
} from "@/lib/api";
import { CompileAst, compileMdx } from "@/lib/compile";
import useMdxRenderer from "@/hooks/useMdxRenderer";
import Layout, { injectLayoutContext } from "@/components/Layout";
import Meta from "@/components/Meta";
import _ from "lodash";
import useTemplateRender from "@/components/Templates/useTemplate";

type PageProps = {
  post: PostAst;
  compiled: CompileAst;
};

export default injectLayoutContext(function Page({
  post,
  compiled,
}: PageProps) {
  const [Component, frontmatter] = useMdxRenderer({ code: compiled.content });
  const [Renderer] = useTemplateRender(post.collection);

  return (
    <>
      <Meta
        title={frontmatter.title}
        titleTemplate={`%s | ${_.capitalize(post.collection)}`}
      />
      <Layout theme="light">
        <Renderer frontmatter={frontmatter}>
          {(components) => <Component components={components} />}
        </Renderer>
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
    const slug = p.name;
    const collection = p.collection;

    return {
      params: { slug, collection },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
