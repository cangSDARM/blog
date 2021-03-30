import { zhihu, jianshu, bilibili, douban, tieba, weibo } from "./styles";
import mainstyle from "./main.module.css";

const Type = {
  ZhiHu_Zhuanlan: "zhuanlan.zhihu.com",
  JianShu: "www.jianshu.com",
  Bilibili: "www.bilibili.com",
  DouBan: "movie.douban.com",
  TieBa: "tieba.baidu.com",
  Weibo: "weibo.com",
};

function styleConcat(...typeStyle) {
  const arcivePost = [mainstyle.arcivePost];
  return arcivePost.concat(typeStyle).join(` `);
}

export const useType = (typo) => {
  switch (typo) {
    case Type.ZhiHu_Zhuanlan:
      return styleConcat(zhihu);
    case Type.JianShu:
      return styleConcat(jianshu);
    case Type.Bilibili:
      return styleConcat(bilibili);
    case Type.DouBan:
      return styleConcat(douban);
    case Type.TieBa:
      return styleConcat(tieba);
    case Type.Weibo:
      return styleConcat(weibo);
    default:
      return styleConcat();
  }
};
