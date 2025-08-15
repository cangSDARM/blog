import React from "react";
import classes from "./style.module.scss";
import { useAHPState } from "./ahp";

const toFixed = (num?: number, fixed = 2) => {
  return (num || 0).toFixed(fixed);
};

const Calculator: React.FC = () => {
  const [criteria] = useAHPState("criteria");
  const [eigenvector] = useAHPState("eigenvector");
  const [weights] = useAHPState("weight");
  const [lamdaMax] = useAHPState("lamdaMax");
  const [CI] = useAHPState("CI");

  return (
    <>
      <table className={classes.table}>
        <tbody>
          <tr>
            <td colSpan={5}>AHP&nbsp;层次分析结果</td>
          </tr>
          <tr>
            <td>项</td>
            <td>特征向量</td>
            <td>权重值</td>
            <td>最大特征根</td>
            <td>CI&nbsp;值</td>
          </tr>
          {weights
            ?.sort((a, b) => b - a)
            .map((weight, index) => {
              if (!weight) return <React.Fragment key={index} />;

              return (
                <tr key={index}>
                  <td>{criteria[index]}</td>
                  <td>{toFixed(eigenvector[index], 3)}</td>
                  <td>{toFixed((weight || 0) * 100, 2)}%</td>
                  {index === 0 && (
                    <>
                      <td rowSpan={criteria.length}>{toFixed(lamdaMax, 3)}</td>
                      <td rowSpan={criteria.length}>{toFixed(CI, 4)}</td>
                    </>
                  )}
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default Calculator;
