import Layout, { injectLayoutContext } from "@/components/Layout";
import { collectionOverview } from "@/lib/api";
import React from "react";

export default injectLayoutContext(function Page() {
  return <Layout theme="light">quic</Layout>;
});

export function getStaticProps() {
  const overview = collectionOverview();

  return {
    props: { overview },
  };
}
