import Meta from "@/components/Meta";
import Layout, { injectLayoutContext } from "@/components/Layout";
import { collectionOverview } from "@/lib/api";
import React from "react";
import FloatToy from "@/components/FloatToy";
import Link from "next/link";

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
            margin: "0 50px",
          }}
        >
          <label>
            Reference:&nbsp;&nbsp;
            <Link href="https://github.com/evanw/float-toy" target="__blank">
              https://github.com/evanw/float-toy
            </Link>
          </label>
          <ul>
            TODO:
            <li>
              1.{" "}
              <Link href="https://github.com/shiona/float-toy" target="__blank">
                display format (decimal)
              </Link>
            </li>
            <li>
              2.{" "}
              <Link href="https://github.com/evanw/float-toy/issues/10">
                more format (BF16, TF32, F8, unum)
              </Link>
            </li>
          </ul>

          <FloatToy />
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
