import React from "react";
import classes from "./style.module.scss";
import { useAHPState } from "./ahp";

const QA: React.FC<React.PropsWithChildren<{ question: string }>> = ({
  children,
  question,
}) => {
  return (
    <li>
      {question}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        答：
        {children}
      </div>
    </li>
  );
};

const SizeInput: React.FC<{
  value: number;
  onChange: (val: number) => void;
  maxSize?: number;
}> = ({ value, onChange, maxSize = 15 }) => {
  return (
    <input
      value={value}
      onChange={(e) => {
        const size = Number.parseInt(e.target.value);
        if (Number.isNaN(size) || size > maxSize) return;
        onChange(size);
      }}
      type="number"
      min="1"
      max="15"
      style={{ width: "3ex", flex: "0 0 auto" }}
    />
  );
};

const QAGroup: React.FC = () => {
  const [target, setTarget] = useAHPState("target", "");

  const [criteria, setCriteria] = useAHPState(
    "criteria",
    Array.from<string>({ length: 3 }).fill("")
  );
  const [methods, setMethods] = useAHPState(
    "methods",
    Array.from<string>({ length: 3 }).fill("")
  );

  return (
    <>
      <section className={classes.layers}>
        <ol>
          <QA question="评价的目标是什么？">
            <input value={target} onChange={(e) => setTarget(e.target.value)} />
          </QA>
          <QA question="为了达到这个目标有哪几种可选的方案？">
            <SizeInput
              value={methods.length}
              onChange={(size) => {
                setMethods((old) =>
                  Array.from({ length: size }).map((_, i) => old[i] || "")
                );
              }}
            />
            种，分别是
            {methods.map((c, i) => (
              <React.Fragment key={i}>
                {i < 1 ? "" : i < methods.length - 1 ? "，" : "和"}
                <input
                  value={c}
                  onChange={(e) => {
                    setMethods((old) => {
                      const values = [...old];
                      values[i] = e.target.value;
                      return values;
                    });
                  }}
                />
              </React.Fragment>
            ))}
          </QA>
          <QA question="根据什么东西来评价好坏？">
            <SizeInput
              value={criteria.length}
              onChange={(size) => {
                setCriteria((old) =>
                  Array.from({ length: size }).map((_, i) => old[i] || "")
                );
              }}
            />
            种，分别是
            {criteria.map((c, i) => (
              <React.Fragment key={i}>
                {i < 1 ? "" : i < criteria.length - 1 ? "，" : "和"}
                <input
                  value={c}
                  onChange={(e) => {
                    setCriteria((old) => {
                      const values = [...old];
                      values[i] = e.target.value;

                      return values;
                    });
                  }}
                />
              </React.Fragment>
            ))}
          </QA>
        </ol>
      </section>
    </>
  );
};

export default QAGroup;
