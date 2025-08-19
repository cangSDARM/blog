import Meta from "@/components/Meta";
import Layout, { injectLayoutContext } from "@/components/Layout";
import { collectionOverview } from "@/lib/api";
import React from "react";

export default injectLayoutContext(function () {
  return (
    <>
      <Meta />
      <Layout theme="light">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            alignItems: "stretch",
          }}
        >
          <ul>
            TODO:
            <li>1. make it as whole web site theme</li>
            <li>2. more readable</li>
            <li>3. auto process elements</li>
          </ul>
          <iframe style={{ flex: "1 1" }} src="https://noyaml.com/">
            https://noyaml.com/
          </iframe>
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
