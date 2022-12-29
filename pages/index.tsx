import Image from "@/components/Image";
import Meta from "@/components/Meta";
import Layout, { injectLayoutContext } from "@/components/Layout";
import puns from "@/row/pun";
import { collectionOverview } from "@/lib/api";

export default injectLayoutContext(function () {
  return (
    <>
      <Meta />
      <Layout theme="light">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            alignItems: "center",
          }}
        >
          <div
            style={{
              margin: `0 auto`,
              maxWidth: `300px`,
              marginTop: `1rem`,
            }}
          >
            <Image src="/images/doctor-strange-logo" />
          </div>
          <div
            style={{
              margin: "1em .5em",
              paddingLeft: "1em",
              lineHeight: 1.2,
              fontSize: 14,
              backgroundColor: "#f1f1f1",
            }}
          >
            {puns.map((pun) => {
              return (
                <blockquote
                  style={{
                    color: "rgba(0,0,0,.5)",
                    padding: "4px 0 3px",
                  }}
                  key={pun.toString()}
                >
                  {pun}
                </blockquote>
              );
            })}
          </div>
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
