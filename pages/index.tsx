import Image from "@/components/Image";
import Meta from "@/components/Meta";
import Layout, { injectLayoutContext } from "@/components/Layout";
import puns from "@/row/pun";
import { collectionOverview } from "@/lib/api";
import Logo from "@/public/images/doctor-strange-logo.png";
import Glitch from "@/components/Glitch";

export default injectLayoutContext(function () {
  return (
    <>
      <Meta />
      <Layout theme="light">
        <div className="flex flex-col justify-between h-full items-center">
          <div
            style={{
              margin: `0 auto`,
              maxWidth: `300px`,
              marginTop: `1rem`,
            }}
          >
            <Image.Static src={Logo} alt="doctor" />
          </div>
          <div
            style={{
              margin: "1em .5em",
              paddingLeft: "1em",
              lineHeight: 1.2,
              fontSize: 14,
              backgroundColor: "var(--colorNeutralBackground1Hover)",
            }}
          >
            {puns.map((pun) => {
              return (
                <Glitch
                  as="blockquote"
                  style={{
                    color: "var(--colorNeutralForeground1Hover)",
                    padding: "4px 0 3px",
                  }}
                  key={pun.toString()}
                >
                  {pun}
                </Glitch>
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
