"use client";
import React from "react";
import { compile, execute } from "./runner";
import { useContainer } from "./hooks";
import { setDependencies, initialContext, emitEvent, onEvent } from "./sandbox";

const DisplayError: React.FC<{ error: string }> = ({ error }) => {
  return (
    <>
      {error && (
        <pre className="language-js">
          <code className="language-js code-highlight">
            <span className="code-line">{error}</span>
          </code>
        </pre>
      )}
    </>
  );
};

const Root: React.FC = () => {
  const id = React.useId();
  return (
    <>
      <i
        id={id}
        data-code-container
        ref={(ref) => {
          if (!ref) return;

          initialContext(window, { contextname: id });
        }}
      />
    </>
  );
};

const DependenciesResolver: React.FC<{ dependencies: string[] }> = ({
  dependencies,
}) => {
  const [error, setError] = React.useState("");
  const onRef = useContainer((container) => {
    onEvent(container, "DependenciesError", (e) =>
      setError((e as any).reason ?? String(e))
    );
    setDependencies(container, dependencies).catch((e) =>
      emitEvent(container, "DependenciesError", e)
    );
  });

  return (
    <>
      <i
        data-dependencies-resolver
        data-dependencies={dependencies}
        ref={onRef}
      />
      <DisplayError error={error} />
    </>
  );
};

const PrismCodeNameRegex = /language-.*:(.*)/iu;
const Runner: React.FC<
  React.DetailedHTMLProps<
    React.BlockquoteHTMLAttributes<HTMLQuoteElement>,
    HTMLQuoteElement
  > & { noOutput: boolean }
> = ({ children, style, noOutput = false, ...props }) => {
  const [filename, setFilename] = React.useState("");
  const [error, setError] = React.useState("");

  const findCodeFilename = (classList?: DOMTokenList) => {
    let name = "";
    Array.from(classList ?? []).forEach((clz) => {
      const result = PrismCodeNameRegex.exec(clz);
      if (result) {
        name = result[1];
      }
    });
    return name;
  };

  const onRef = useContainer((container, ref) => {
    const codeElement = ref.querySelector("pre > code") as HTMLElement;
    const code = codeElement?.innerText || ""; // will resolve all pre.code.span text. which means the code
    const name = findCodeFilename(codeElement?.classList);
    setFilename(name);
    codeElement.style.display = "none";

    console.log("[CodeContainer] file %s loaded, %i bytes", name, code.length);
    ref.setAttribute("filename", name);
    onEvent(container, name + "RunnerError", (e) =>
      setError((e as any).reason ?? String(e))
    );
    onEvent(container, "DependenciesResolved", () => {
      console.log("[CodeContainer] %s compiling...", name);
      compile(code)
        .then((result) => execute(name, result.outputText, container))
        .catch((e) => emitEvent(container, name + "RunnerError", e));
    });
  });

  return (
    <>
      <blockquote
        {...props}
        data-code-runner
        ref={onRef}
        style={Object.assign({}, style, noOutput ? { margin: 0 } : undefined)}
        title={filename}
      >
        {children}
      </blockquote>
      <DisplayError error={error} />
    </>
  );
};

export default {
  Root,
  DependenciesResolver,
  Runner,
};
