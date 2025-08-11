import Meta from "@/components/Meta";
import Layout, { injectLayoutContext } from "@/components/Layout";
import { collectionOverview } from "@/lib/api";
import React from "react";

import LeakyBucket from "@/components/RateLimits/LeakyBucket";
import TokenBucket from "@/components/RateLimits/TokenBucket";
import FixedWindow from "@/components/RateLimits/FixedWindow";
import SlidingWindow from "@/components/RateLimits/SlidingWindow";

const Section: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <section
      style={{
        padding: "2em 3em 1em",
        width: "72vw",
        maxWidth: "800px",
        minWidth: "600px",
      }}
    >
      {children}
    </section>
  );
};

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
          <Section>
            <label>
              Reference:
              <a href="https://github.com/Sagyam/tools" target="__blank">
                https://github.com/Sagyam/tools
              </a>
            </label>
          </Section>
          <Section>
            <h2>漏水桶</h2>
            <ul>
              <li>
                当收到请求时：
                <ul style={{ listStyle: "decimal", padding: "revert" }}>
                  <li>
                    以设定的<strong>恒定速率</strong>处理
                  </li>
                  <li>如果新请求到达时存储桶已满，则会丢弃该请求</li>
                </ul>
              </li>
            </ul>
            <LeakyBucket />
          </Section>
          <Section>
            <h2>令牌桶</h2>
            <ul>
              <li>令牌以固定速率添加到存储桶中</li>
              <li>
                当收到请求时：
                <ul style={{ listStyle: "decimal", padding: "revert" }}>
                  <li>如果令牌可用，则会将其从存储桶中删除并允许请求</li>
                  <li>如果没有可用的令牌，则请求将被拒绝或延迟</li>
                </ul>
              </li>
            </ul>
            <TokenBucket />
          </Section>
          <Section>
            <h2>固定窗口</h2>
            <ul>
              <li>
                当收到请求时：
                <ul style={{ listStyle: "decimal", padding: "revert" }}>
                  <li>计数器跟踪当前窗口中每个客户端/IP 的请求数</li>
                  <li>
                    如果计数超过限制，则进一步的请求将被拒绝，直到下一个窗口
                  </li>
                </ul>
              </li>
            </ul>
            <FixedWindow />
          </Section>
          <Section>
            <h2>滑动窗口</h2>
            <ul>
              <li>
                当收到请求时：
                <ul style={{ listStyle: "decimal", padding: "revert" }}>
                  <li>计算在过去 X 秒内发出的请求数</li>
                  <li>如果低于限制，则允许并记录请求</li>
                  <li>否则，它将被拒绝</li>
                </ul>
              </li>
            </ul>
            <SlidingWindow />
          </Section>
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
