import React from "react";
import classes from "./style.module.scss";
import Link from "next/link";

const Title: React.FC = () => {
  return (
    <>
      <h1 className={classes.title}>Float Toy</h1>
      <p>
        Click on a cell below to toggle bit values, or edit the hex or decimal
        values directly. Use this to build intuition for the IEEE floating-point
        format. See Wikipedia for details on the&nbsp;
        <Link
          target="__blank"
          href="https://en.wikipedia.org/wiki/Half-precision_floating-point_format"
        >
          half-precision
        </Link>
        ,&nbsp;
        <Link
          target="__blank"
          href="https://en.wikipedia.org/wiki/Single-precision_floating-point_format"
        >
          single-precision
        </Link>
        &nbsp; and&nbsp;
        <Link
          target="__blank"
          href="https://en.wikipedia.org/wiki/Double-precision_floating-point_format"
        >
          double-precision
        </Link>
        &nbsp; floating-point formats.
      </p>
      <p>
        Due to the nature of floating-point numbers, there are multiple integers
        that map to the same 64-bit floating-point number once the integer gets
        above 2^53. So the display format will be &quot;insufficiently
        accurate&quot;.
      </p>
    </>
  );
};

export default Title;
