import React from "react";
import "./style.css";

const Footer = (props) => {
  return (
    <footer {...props}>
      <span>
        © {new Date().getFullYear()}, Built with&nbsp;
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </span>
      <div>
        本博客仍在勘误阶段，请务必结合网络资料再参考本博客内容。作者保留对本博客的版权。
      </div>
    </footer>
  );
};

export default Footer;
