import Meta from "@/components/Meta";
import Layout, { injectLayoutContext } from "@/components/Layout";
import { collectionOverview } from "@/lib/api";
import React from "react";
import AHP from "@/components/AHP";

export default injectLayoutContext(function () {
  return (
    <>
      <Meta />
      <Layout theme="light">
        <div className="flex flex-col justify-center items-center">
          <AHP />
        </div>
      </Layout>
    </>
  );
});

export function getStaticProps() {
  const overview = collectionOverview();

  return {
    props: { overview },
  };
}
