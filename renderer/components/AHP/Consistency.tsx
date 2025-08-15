import React from "react";
import classes from "./style.module.scss";
import { useAHPState, RITable } from "./ahp";

const toFixed = (num?: number, fixed = 2) => {
  return (num || 0).toFixed(fixed);
};

const Consistency: React.FC = () => {
  const [criteria] = useAHPState("criteria");
  const [lamdaMax] = useAHPState("lamdaMax");
  const [CI] = useAHPState("CI");

  const RI = React.useMemo(() => RITable[criteria.length], [criteria.length]);
  const CR = React.useMemo(() => CI / RI, [RI, CI]);

  return (
    <>
      <table className={classes.table}>
        <tbody>
          <tr>
            <td colSpan={5}>一致性检验结果汇总</td>
          </tr>
          <tr>
            <td>最大特征根 </td>
            <td>CI&nbsp;值</td>
            <td>RI&nbsp;值</td>
            <td>CR&nbsp;值</td>
            <td>一致性检验结果</td>
          </tr>
          <tr>
            <td>{toFixed(lamdaMax, 3)}</td>
            <td>{toFixed(CI, 4)}</td>
            <td>{RI}</td>
            <td>{toFixed(CR, 4)}</td>
            <td>{CR < 0.1 ? "通过" : "不通过"}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Consistency;
