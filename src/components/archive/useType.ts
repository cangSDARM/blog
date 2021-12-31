//@ts-ignore
import * as mainStyle from "./main.module.css";
import {
  bilibili,
  douban,
  godot,
  guancha,
  jianshu,
  tieba,
  weibo,
  zhihu,
} from "./styles";

const Type = {
  ZhiHu_Zhuanlan: "zhuanlan.zhihu.com",
  JianShu: "www.jianshu.com",
  Bilibili: "www.bilibili.com",
  DouBan: "movie.douban.com",
  TieBa: "tieba.baidu.com",
  Weibo: "weibo.com",
  Godot: "docs.godotengine.org",
  Guancha: "user.guancha.cn",
};

function styleConcat(...typeStyle: string[]) {
  const archivePost = [mainStyle.arcivePost];
  return archivePost.concat(typeStyle).join(` `);
}

export const useType = (typo: string) => {
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
    case Type.Godot:
      return styleConcat(godot);
    case Type.Guancha:
      return styleConcat(guancha);
    default:
      return styleConcat();
  }
};
