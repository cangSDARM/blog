import React from "react";
import classes from "./style.module.scss";
import clsx from "clsx";
import { extractNumber, reduceNumber, toByteArray, toHexString } from "./util";
import { useFormatPainter } from "./formatPainter";

const autoSelect = (e: React.FocusEvent<HTMLInputElement, Element>) =>
  e.target.select();
const hexAlphabet = "0123456789abcdefABCDEF";

const Input: React.FC<{
  value: string;
  hexLength: number;
  setBytes: (array: number[], offset: number, fillZero: boolean) => void;
  onChange: (value: string) => void;
  onBlur: () => void;
}> = ({ value, hexLength, setBytes, onChange, onBlur }) => {
  return (
    <input
      value={value}
      onFocus={autoSelect}
      onBlur={onBlur}
      onKeyDown={(e) => {
        switch (e.key) {
          case "Enter":
            e.preventDefault();
            onBlur();
            break;
        }
      }}
      onChange={(e) => {
        const value = e.target.value;
        const validHexCharas = value
          .split("")
          .every((c) => hexAlphabet.split("").lastIndexOf(c) !== -1);

        let result = value;
        if (value.length > hexLength * 2 || validHexCharas === false) {
          result = value.slice(0, -1);
          return;
        }

        var tmpBytes = toByteArray(result);
        setBytes(tmpBytes.reverse(), hexLength - tmpBytes.length, true);
        onChange(result);
      }}
    />
  );
};

const OutPut: React.FC<{
  value: string;
  onModify: (value: string, offset: number) => void;
  onChange: (value: string) => void;
  onBlur: () => void;
}> = ({ value, onModify, onChange, onBlur }) => {
  return (
    <input
      value={value}
      onFocus={autoSelect}
      onBlur={onBlur}
      onKeyDown={(e) => {
        switch (e.key) {
          case "Enter":
            e.preventDefault();
            onModify(e.currentTarget.value, 0);
            onBlur();
            break;
          case "ArrowUp":
            e.preventDefault();
            e.currentTarget.select();
            onModify(e.currentTarget.value, +1);
            break;
          case "ArrowDown":
            e.preventDefault();
            e.currentTarget.select();
            onModify(e.currentTarget.value, -1);
            break;
        }
      }}
      onChange={(e) => {
        onModify(e.target.value, 0);
        onChange(e.target.value);
      }}
    />
  );
};

const Nibble: React.FC<{
  index: number;
  signed?: boolean;
}> = ({ index, signed }) => {
  return (
    <span className={classes.nibble} data-dark={signed} key={index}>
      {index}
    </span>
  );
};

const Bit: React.FC<{
  index: number;
  exponentBits: number;
  signed?: boolean;
  onPointerDown: () => void;
  onPointerUp: () => void;
  onPointerOver: () => void;
}> = ({
  index,
  exponentBits,
  signed,
  onPointerDown,
  onPointerOver,
  onPointerUp,
}) => {
  return (
    <span
      className={clsx([
        classes.bit,
        index === 0
          ? classes.sign
          : index < 1 + exponentBits
            ? classes.exponent
            : classes.fraction,
      ])}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerOver={onPointerOver}
    >
      {signed ? 1 : 0}
    </span>
  );
};

const Unit: React.FC<{
  title: string;
  exponentBits: number;
  floatArray: Float16Array | Float32Array | Float64Array;
}> = ({ title, exponentBits, floatArray }) => {
  const bytes = React.useMemo(
    () => new Uint8Array(floatArray.buffer),
    [floatArray]
  );
  const hexLength = React.useMemo(() => bytes.length, [bytes]);

  const [parts, setParts] = React.useState({
    sign: 0 | 1,
    fraction: 0,
    exponent: 0,
  });

  const [inputValue, setInputValue] = React.useState("");
  const [outputValue, setOutputValue] = React.useState("");

  const { paintAreaRef, getInitialFormat, capture, release } = useFormatPainter();

  const calculateInput = () => {
    setInputValue(toHexString(bytes.slice().reverse()));
  };
  const calculateOutput = () => {
    setOutputValue(
      reduceNumber(
        floatArray[0] === 0 && 1 / floatArray[0] === -Infinity
          ? -0
          : floatArray[0],
        bytes
      )
    );
  };
  const calculateParts = () => {
    // Figure out exponent
    let exponent = 0;
    for (var i = 0; i < exponentBits; i++) {
      var index = 1 + i;
      var bit =
        (bytes[bytes.length - (index >> 3) - 1] >> (7 - (index & 7))) & 1;
      exponent += bit << (exponentBits - i - 1);
    }
    var exponentBias = (1 << (exponentBits - 1)) - 1;
    exponent -= exponentBias;

    // Figure out fraction
    const copyBytes = new Uint8Array(bytes);
    const copy =
      bytes.length === 2
        ? new Float16Array(copyBytes.buffer)
        : bytes.length === 4
          ? new Float32Array(copyBytes.buffer)
          : new Float64Array(copyBytes.buffer);
    for (var i = 0; i < exponentBits; i++) {
      const index = 1 + i;
      const byteIndex = bytes.length - (index >> 3) - 1;
      const byteMask = 1 << (7 - (index & 7));
      copyBytes[byteIndex] =
        (copyBytes[byteIndex] & ~byteMask) | (i === 0 ? 0 : byteMask);
    }
    const signIndex = bytes.length - 1;
    const signMask = 0x80;
    const sign = copyBytes[signIndex] & signMask;

    copyBytes[signIndex] &= ~signMask;
    let fraction = copy[0];

    // Handle denormal numbers
    if (exponent === -exponentBias) {
      exponent++;
      fraction--;
    }

    setParts({ exponent, fraction, sign });
  };
  const calculateAll = () => {
    calculateInput();
    calculateOutput();
    calculateParts();
  };

  React.useEffect(() => {
    calculateAll();
  }, [floatArray]);

  return (
    <>
      <h2>{title}</h2>

      <div className={classes["input-area"]}>
        <section ref={paintAreaRef} className={classes["visualize-section"]}>
          {Array.from({ length: hexLength }).map((_, i) => {
            return Array.from({ length: 8 }).map((_, j) => {
              const nibbleIndex = (hexLength - i) * 8 - j;
              const bitIndex = i * 8 + j;
              const signed = !!(
                (bytes[bytes.length - (bitIndex >> 3) - 1] >>
                  (7 - (bitIndex & 7))) &
                1
              );

              return (
                <span key={bitIndex}>
                  <Nibble index={nibbleIndex} signed={j <= 3} />
                  <Bit
                    signed={signed}
                    index={bitIndex}
                    exponentBits={exponentBits}
                    onPointerDown={() => {
                      const byteIndex = bytes.length - (bitIndex >> 3) - 1;
                      const byteMask = 1 << (7 - (bitIndex & 7));
                      const initialMask = bytes[byteIndex] & byteMask ? 0 : 1;
                      bytes[byteIndex] ^= byteMask;

                      capture(initialMask);
                      calculateAll();
                    }}
                    onPointerOver={() => {
                      const initialMask = getInitialFormat();
                      if (initialMask) {
                        const byteIndex = bytes.length - (bitIndex >> 3) - 1;
                        const byteMask = 1 << (7 - (bitIndex & 7));
                        bytes[byteIndex] =
                          (bytes[byteIndex] & ~byteMask) |
                          (byteMask * Number.parseInt(initialMask, 10));

                        calculateAll();
                      }
                    }}
                    onPointerUp={release}
                  />
                </span>
              );
            });
          })}
        </section>
        <span>&nbsp;&nbsp;=&nbsp;&nbsp;0x</span>
        <span>
          <Input
            value={inputValue}
            setBytes={(array, offset, fill) => {
              if (fill) bytes.fill(0);
              bytes.set(array, offset);
              calculateParts();
              calculateOutput();
            }}
            onChange={setInputValue}
            // sync calculated itself until user not interest.
            // otherwise show the input text directly
            onBlur={calculateInput}
            hexLength={hexLength}
          />
        </span>
      </div>
      <div className={classes["output-area"]}>
        <section style={{ padding: "3px" }}>
          <span className={classes.sign}>{parts.sign ? -1 : 1}</span>
          &nbsp;&nbsp;&times;&nbsp;&nbsp;
          <span className={classes.exponent}>
            2<sup>{parts.exponent}</sup>
          </span>
          &nbsp;&nbsp;&times;&nbsp;&nbsp;
          <span className={classes.fraction}>
            {reduceNumber(parts.fraction, bytes)}
          </span>
        </section>
        <span>&nbsp;&nbsp;=&nbsp;&nbsp;</span>
        <span>
          <OutPut
            value={outputValue}
            onModify={(value, offset) => {
              floatArray[0] = extractNumber(value) + offset;
              calculateInput();
              calculateParts();
              // modified by keyboard
              if (offset !== 0) {
                calculateOutput();
              }
            }}
            // sync calculated itself until user not interest.
            // otherwise show the input text directly
            onChange={setOutputValue}
            onBlur={calculateOutput}
          />
        </span>
      </div>
    </>
  );
};

export default Unit;
