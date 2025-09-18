import React from "react";
import Title from "./Title";
import classes from "./style.module.scss";
import Unit from "./Unit";
import { Float16Array } from "./util";

const FloatToy: React.FC = () => {
  return (
    <div className={classes.root}>
      <Title />

      <Unit
        title="16-bit (half)"
        exponentBits={5}
        floatArray={new Float16Array([Math.PI]) as any}
      />
      <Unit
        title="32-bit (float)"
        exponentBits={8}
        floatArray={new Float32Array([Math.PI])}
      />
      <Unit
        title="64-bit (double)"
        exponentBits={11}
        floatArray={new Float64Array([Math.PI])}
      />
    </div>
  );
};

export default FloatToy;
