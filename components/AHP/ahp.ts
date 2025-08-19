import React from "react";
import { Matrix2 } from "./matrix";

type AHPState = {
  target: string;
  criteria: string[];
  methods: string[];
  matric: Matrix2;
  eigenvector: number[];
  weight: number[];
  method: "sum" | "root" | "eig"; // TODO: eig
  lamdaMax: number;
  CI: number;
};

export const RITable = [
  0, 0, 0, 0.52, 0.89, 1.12, 1.26, 1.36, 1.41, 1.46, 1.49, 1.52, 1.54, 1.56,
  1.58, 1.59, 1.5943, 1.6064, 1.6133, 1.6207, 1.6292, 1.6358, 1.6403, 1.6462,
];

/** 牛顿迭代求 n 次方根 */
function nthRootNewton(a: number, n: number, precision = 1e-10) {
  if (a === 0) return 0;
  if (n === 0) return NaN;
  if (a < 0 && n % 2 === 0) return NaN;

  const sign = a < 0 ? -1 : 1;
  let x = Math.abs(a); // 初始猜测值
  let prev;

  // 牛顿迭代
  do {
    prev = x;
    x = ((n - 1) * x + Math.abs(a) / Math.pow(x, n - 1)) / n;
  } while (Math.abs(x - prev) > precision);

  return sign * x;
}

const sum = (slicer: number[]) => {
  return slicer.reduce((acc, cur) => acc + cur, 0);
};

const normalize = (slicer: number[]) => {
  const s = sum(slicer);
  return slicer.map((e) => e / s);
};

class AHP {
  private states: AHPState = {
    target: "" as string,
    criteria: [] as string[],
    methods: [] as string[],
    matric: new Matrix2(0),
    eigenvector: [],
    weight: [],
    method: "root",
    lamdaMax: 0,
    CI: 0,
  };

  private listeners: [() => void, string][] = [];

  constructor() {}

  subscribe(dependency: string = "") {
    return (listener: () => void) => {
      const index = this.listeners.push([listener, dependency]);

      return () => {
        this.listeners.splice(index, 1);
      };
    };
  }

  dispatch(dependency: keyof AHPState) {
    this.listeners.forEach(([l, d]) => {
      if (d === dependency) {
        l();
      }
    });
  }

  set<T extends keyof AHPState>(property: T, value: AHPState[T]) {
    this.states[property] = value;
    this.dispatch(property);
  }

  get<T extends keyof AHPState>(property: T) {
    return this.states[property];
  }

  getSnapshot<T extends keyof AHPState>(property: T) {
    return () => this.states[property];
  }

  calculate() {
    console.log("cal");

    const order = this.states.matric.order;
    const eigenvector: number[] = [];
    switch (this.states.method) {
      case "root": {
        this.states.matric.forEachRow((row) => {
          const product = row.reduce((acc, cur) => acc * cur, 1);
          eigenvector.push(nthRootNewton(product, order));
        });
        this.set("eigenvector", eigenvector);
        this.set("weight", normalize(eigenvector));
        break;
      }
      case "sum": {
        const normalizedColumns: number[][] = [];
        this.states.matric.forEachColumn((column) => {
          normalizedColumns.push(normalize(column));
        });
        for (let j = 0; j < order; j++) {
          const sum = normalizedColumns.reduce(
            (acc, column) => acc + column[j],
            0
          );
          eigenvector.push(sum);
        }
        this.set("eigenvector", eigenvector);
        this.set("weight", normalize(eigenvector));
        break;
      }
    }

    const weights = this.states.weight;
    const aw: number[] = [];
    this.states.matric.forEachRow((row, i) => {
      // = 每行 x Weight
      const products = row.map((item, j) => item * weights[j]);
      aw.push(sum(products));
    });

    const lamdaMax = sum(aw.map((a, i) => a / weights[i])) / order;
    this.set("lamdaMax", lamdaMax);
    this.set("CI", (lamdaMax - order) / (order - 1));
  }
}

export const ahp = new AHP();

export const useAHPState = <T extends keyof AHPState>(
  property: T,
  defaultValue?: AHPState[T]
) => {
  const [subscribe, getSnapshot] = React.useMemo(() => {
    return [ahp.subscribe(property), ahp.getSnapshot(property)] as const;
  }, [property]);

  const value = React.useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  React.useEffect(() => {
    if (defaultValue) {
      ahp.set(property, defaultValue);
    }
  }, []);

  const setProperty = React.useCallback(
    (value: React.SetStateAction<AHPState[T]>) => {
      if (typeof value === "function") {
        ahp.set(property, value(ahp.get(property)));
      } else {
        ahp.set(property, value);
      }
    },
    [property]
  );

  return [value, setProperty] as const;
};
