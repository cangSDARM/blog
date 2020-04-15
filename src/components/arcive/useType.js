import React from 'react';
import styles from './type.module.css';
import mainstyle from './main.module.css';

const Type = {
  ZhiHu_Zhuanlan: "zhuanlan.zhihu.com"
}

export const useType = (typo) => {
  switch (typo) {
    case Type.ZhiHu_Zhuanlan:
      return [mainstyle.arcivePost].concat(styles.ZhiHu_Zhuanlan).join(` `)
  }
}