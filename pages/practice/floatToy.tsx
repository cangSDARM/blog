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
            <li>1. display format (decimal)</li>
            <li>2. more format (BF16, TF32, F8, unum)</li>
            <li>3. bits starting from 0</li>
            <li>4. number starting from 0.0</li>
          </ul>
          <iframe
            style={{ flex: "1 1" }}
            src="https://evanw.github.io/float-toy/"
          >
            https://evanw.github.io/float-toy/
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
