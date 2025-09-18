import createFloat16 from "./float16";

export const { Float16Array } = createFloat16();

export function extractNumber(value: string) {
  return +value.replace(/\b(?:infinity|inf)\b/gi, "Infinity");
}

export function toByteArray(hexString: string) {
  var result = [];
  if (hexString.length % 2 == 1) {
    hexString = hexString + "0";
  }
  for (var i = 0; i < hexString.length; i += 2) {
    result.push(parseInt(hexString.substring(i, i + 2), 16));
  }
  return result;
}

export function toHexString<T extends number>(byteArray: ArrayLike<T>) {
  return Array.from(byteArray, function (byte) {
    return ("0" + byte.toString(16).toUpperCase()).slice(-2);
  }).join("");
}

export function reduceNumber(x: number | string, bytes: ArrayLike<number>) {
  const copy =
    bytes.length === 2
      ? new Float16Array(1)
      : bytes.length === 4
        ? new Float32Array(1)
        : new Float64Array(1);
  copy[0] = +x;
  const value = copy[0];

  x = value === 0 && 1 / value === -Infinity ? "-0" : value + "";

  if (x === "NaN" || x === "Infinity" || x === "-Infinity") {
    return x;
  }

  const parts = /^([+-]?\d+)((?:\.\d+)?)((?:[eE][+-]?\d+)?)$/.exec(x);
  if (!parts) return x;

  const whole = parts[1];
  let fraction = parts[2];
  const exponent = parts[3];

  // Remove digits one-by-one until the number changes
  while (fraction.length > 0) {
    // Try truncating
    var truncatedFraction = fraction.slice(0, -1);
    var text =
      whole + (truncatedFraction !== "." ? truncatedFraction : "") + exponent;
    copy[0] = +text;
    var truncatedValue = copy[0];
    if (truncatedValue === value) {
      fraction = truncatedFraction;
      x = text;
      continue;
    }

    // Try rounding
    var roundedFraction = truncatedFraction;
    var i = roundedFraction.length - 1;
    var zero = "0".charCodeAt(0);
    while (i > 0) {
      var c = roundedFraction.charCodeAt(i) - zero;
      roundedFraction =
        roundedFraction.slice(0, i) +
        String.fromCharCode(((c + 1) % 10) + zero) +
        roundedFraction.slice(i + 1);
      if (c < 9) break; // Do we need to carry?
      i--;
    }
    var text =
      whole + (roundedFraction !== "." ? roundedFraction : "") + exponent;
    copy[0] = +text;
    var roundedValue = copy[0];
    if (roundedValue === value) {
      fraction = roundedFraction;
      x = text;
      continue;
    }

    // Both numbers changed, keep the old value
    break;
  }

  return x;
}
