import React from "react";
import PropTypes from "prop-types";
import LazyHighlight from "./lazy-highlight";

const getParams = (name = ``) => {
  const [start, params = ``] = name.split(`:`);
  const [lang, fparams = ``] = start
    .split(`language-`)
    .pop()
    .split(`{`);
  const paramsMerge = `{\"${fparams}\":${params.split(`}`).shift()}}`;
  try {
    return [lang].concat(JSON.parse(paramsMerge));
  } catch (e) {
    console.error("parse error, please enhance this method");
    return [lang].concat(
      params.split(`&`).reduce((merged, param) => {
        const [key, value] = param.split(`=`);
        merged[key] = value;
        return merged;
      }, {})
    );
  }
};

/*
 * MDX passes the code block as JSX
 * we un-wind it a bit to get the string content
 * but keep it extensible so it can be used with just children (string) and className
 */
const CodeBlock = ({
  children,
  className = children.props ? children.props.className : ``,
  metastring,
  copy,
}) => {
  const [language, otherParams] = getParams(className + metastring);
  return (
    <LazyHighlight code={children} language={language} theme={undefined}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <div className="gatsby-highlight">
          <pre className={`language-${language}`}>
            <code className={`language-${language}`}>
              {tokens.map((line, i) => {
                const lineProps = getLineProps({ line, key: i });
                const className = [lineProps.className]
                  .filter(Boolean)
                  .join(` `);
                return (
                  <div key={i} {...Object.assign({}, lineProps, { className })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                );
              })}
            </code>
          </pre>
        </div>
      )}
    </LazyHighlight>
  );
};

CodeBlock.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  className: PropTypes.string,
  copy: PropTypes.bool,
};

CodeBlock.defaultProps = {
  copy: true,
};

export default CodeBlock;
