import React from "react";
import Button from "@/components/Button";
import Select from "@/components/Select";
import { Matrix2 } from "./matrix";
import { useAHPState, ahp } from "./ahp";
import classes from "./style.module.scss";

const Importance = [
  {
    value: "1/9",
    label: "1/9",
  },
  {
    value: "1/8",
    label: "1/8",
  },
  {
    value: "1/7",
    label: "1/7",
  },
  {
    value: "1/6",
    label: "1/6",
  },
  {
    value: "1/5",
    label: "1/5",
  },
  {
    value: "1/4",
    label: "1/4",
  },
  {
    value: "1/3",
    label: "1/3",
  },
  {
    value: "1/2",
    label: "1/2",
  },
  {
    value: "1",
    label: 1,
  },
  {
    value: "2",
    label: 2,
  },
  {
    value: "3",
    label: 3,
  },
  {
    value: "4",
    label: 4,
  },
  {
    value: "5",
    label: 5,
  },
  {
    value: "6",
    label: 6,
  },
  {
    value: "7",
    label: 7,
  },
  {
    value: "8",
    label: 8,
  },
  {
    value: "9",
    label: 9,
  },
];

export const useMatrix = () => {
  const [_, forceUpdate] = React.useState({});

  const [matrix, setMatrix] = React.useState(new Matrix2<string>(0, ""));

  const updateMatrix: typeof setMatrix = (fn) => {
    setMatrix(fn);

    if (typeof fn === "function") {
      forceUpdate({});
    }
  };

  return [matrix, updateMatrix] as const;
};

const parseCounterSelect = (str: string) => {
  const index = str.indexOf("/");
  if (index > 0) return str.substring(index + 1);

  return "1/" + str;
};
const parseString = (str: string) => {
  const [dividend, divisor = "1"] = str.split("/");

  return Number.parseInt(dividend) / Number.parseInt(divisor);
};

const WeightTable: React.FC = () => {
  const [criteria] = useAHPState("criteria");

  const [matric, setMatric] = useMatrix();

  React.useEffect(() => {
    const m = new Matrix2(criteria.length, "1");
    setMatric(m);
  }, [criteria.length]);

  if (criteria.length < 1) return <></>;

  matric.print();
  return (
    <>
      <table className={classes.table}>
        <tbody>
          <tr>
            <td />
            {criteria.map((c, i) => (
              <React.Fragment key={i}>
                <td>{c}</td>
              </React.Fragment>
            ))}
          </tr>
          {criteria.map((c, i) => {
            const width = (1 / (criteria.length + 1)) * 100 + "%";
            if (!c) return <React.Fragment key={i} />;

            return (
              <tr key={c}>
                <td>{c}</td>
                {criteria.map((c, j) => {
                  let content: React.ReactNode = <></>;
                  if (j === i)
                    content = (
                      <td style={{ width, background: "#bdd7ee" }}>
                        {matric.get(i, j)}
                      </td>
                    );
                  else if (j > i)
                    content = (
                      <td style={{ width, background: "#c5e0b5" }}>
                        {matric.get(i, j)}
                      </td>
                    );
                  else {
                    content = (
                      <td style={{ width }}>
                        <Select
                          align="center"
                          value={String(matric.get(i, j))}
                          placeholder="选择重要程度"
                          onValueChange={(value) => {
                            setMatric((matrix) => {
                              matrix.set(i, j, value);
                              matrix.set(j, i, parseCounterSelect(value));
                              return matrix;
                            });
                          }}
                          items={Importance}
                        />
                      </td>
                    );
                  }

                  return <React.Fragment key={j}>{content}</React.Fragment>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Button
        onClick={() => {
          const matrix = Matrix2.identity(matric.order);
          matric.forEach((value, index) => {
            matrix.set(index, parseString(value));
          });
          ahp.set("matric", matrix);
          ahp.calculate();
        }}
      >
        计算
      </Button>
    </>
  );
};

export default WeightTable;
