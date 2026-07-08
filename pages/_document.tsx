import {
  default as NextDoc,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";

export default class Document extends NextDoc {
  render(): JSX.Element {
    return (
      <Html lang="cn">
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
