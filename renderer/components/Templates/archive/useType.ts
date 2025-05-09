import mainStyle from "./main.module.scss";
import {
  bilibili,
  douban,
  godot,
  guancha,
  jianshu,
  tieba,
  weibo,
  zhihu,
  github,
} from "./styles";
import clsx from "clsx";

const Type = {
  ZhiHu_ZhuanLan: "zhuanlan.zhihu.com",
  JianShu: "www.jianshu.com",
  Bilibili: "www.bilibili.com",
  DouBan: "movie.douban.com",
  DouBanXiaoZu: "douban.com/group",
  TieBa: "tieba.baidu.com",
  Weibo: "weibo.com",
  Godot: "docs.godotengine.org",
  Guancha: "user.guancha.cn",
  Github: "www.github.com",
};

function styleConcat(...typeStyle: string[]) {
  const archivePost = [mainStyle.archivePost];
  return clsx(...archivePost, ...typeStyle);
}

export const useType = (typo: string = "") => {
  switch (typo) {
    case Type.ZhiHu_ZhuanLan:
      return styleConcat(zhihu);
    case Type.JianShu:
      return styleConcat(jianshu);
    case Type.Bilibili:
      return styleConcat(bilibili);
    case Type.DouBan:
    case Type.DouBanXiaoZu:
      return styleConcat(douban);
    case Type.TieBa:
      return styleConcat(tieba);
    case Type.Weibo:
      return styleConcat(weibo);
    case Type.Godot:
      return styleConcat(godot);
    case Type.Guancha:
      return styleConcat(guancha);
    case Type.Github:
      return styleConcat(github);
    default:
      console.warn('unknown type "%s" for useType', typo);
      return styleConcat();
  }
};
