import React from "react";
import style from "./DefaultLayout.module.css";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";

interface DefaultLayoutProps extends React.HtmlHTMLAttributes<React.FC> {}

function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className={style.wrapper}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default DefaultLayout;
