import React from "react";
import WeightTable from "./Weight";
import QAGroup from "./QA";
import Calculator from "./Calculator";
import Consistency from "./Consistency";

const AHP: React.FC = () => {
  return (
    <>
      <QAGroup />
      <WeightTable />
      <Calculator />
      <Consistency />
    </>
  );
};

export default AHP;
