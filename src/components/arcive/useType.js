import React from "react";
import styles from "./type.module.css";
import mainstyle from "./main.module.css";

const Type = {
  ZhiHu_Zhuanlan: "zhuanlan.zhihu.com",
  JianShu: "www.jianshu.com",
  Bilibili: "www.bilibili.com",
};

function styleConcat(...typeStyle) {
  const arcivePost = [mainstyle.arcivePost];
  return arcivePost.concat(typeStyle).join(` `);
}

export const useType = (typo) => {
  switch (typo) {
    case Type.ZhiHu_Zhuanlan:
      return styleConcat(styles.ZhiHu_Zhuanlan);
    case Type.JianShu:
      return styleConcat(styles.JianShu);
    case Type.Bilibili:
      return styleConcat(styles.Bilibili);
    default:
      return styleConcat();
  }
};