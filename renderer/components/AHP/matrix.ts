import isNil from "lodash/isNil";

export class Matrix2<Element = number> {
  private matric: Element[] = [];

  constructor(
    public order: number,
    fill?: Element
  ) {
    this.matric = Array.from({ length: Math.pow(order, 2) });

    if (fill) {
      this.matric.fill(fill);
    }
  }

  static identity(order: number) {
    let curOrder = 0;

    const matrix = new Matrix2<number>(order);

    matrix.matric.forEach((_, ij) => {
      if (ij >= order * curOrder) {
        if (ij % order === curOrder) {
          curOrder += 1;
          matrix.set(ij, 1);
          return;
        }
      }
      matrix.set(ij, 0);
    });

    return matrix;
  }
  static ones(order: number) {
    const matrix = new Matrix2<number>(order);
    matrix.matric.fill(1);
    return matrix;
  }
  static mulVector(matric: Matrix2<number>, vector: number[]) {
    const order = matric.order;
    // 检查向量长度是否与矩阵维度匹配
    if (vector.length !== order) {
      throw new Error(`向量长度必须为${order}（与维度匹配）`);
    }

    // 初始化结果向量
    const result = new Array<number>(order).fill(0);

    // 计算乘积：result[i] = 矩阵第i行与向量的点积
    for (let i = 0; i < order; i++) {
      // 矩阵第i行的起始索引（行优先存储）
      const rowStart = i * order;

      // 计算点积
      for (let j = 0; j < order; j++) {
        result[i] += matric.matric[rowStart + j] * vector[j];
      }
    }

    return result;
  }

  /** set matrix like plain array */
  set(ij: number, value: Element): void;
  /** set matrix like number[][] */
  set(i: number, j: number, value: Element): void;
  set(i: number, j: number | Element, value?: Element) {
    if (isNil(value)) {
      this.matric[i] = j as Element;
    } else {
      this.matric[i * this.order + (j as number)] = value!;
    }
  }

  /** get matrix like plain array */
  get(ij: number): Element;
  /** get matrix like number[][] */
  get(i: number, j: number): Element;
  get(i: number, j?: number) {
    if (Number.isFinite(j)) {
      return this.matric[i * this.order + j!];
    } else {
      return this.matric[i];
    }
  }

  getRow(i: number) {
    return this.matric.slice(i * this.order, this.order * (i + 1));
  }
  getColumn(j: number) {
    return Array.from({ length: this.order }).map((_, i) => {
      return this.matric[i * this.order + j];
    });
  }

  forEach(callbackFn: (value: Element, index: number) => void) {
    this.matric.forEach(callbackFn);
  }
  forEachRow(callbackFn: (value: Element[], row: number) => void) {
    for (let i = 0; i < this.order; i++) {
      callbackFn(this.getRow(i), i);
    }
  }
  forEachColumn(callbackFn: (value: Element[], row: number) => void) {
    for (let j = 0; j < this.order; j++) {
      callbackFn(this.getColumn(j), j);
    }
  }

  print() {
    const order = this.order;

    console.group("Matrix", order, this.matric);
    for (let i = 0; i < order; i++) {
      // console.log(i, order);
      console.log(this.matric.slice(i * order, (i + 1) * order));
    }
    console.groupEnd();
  }
}
