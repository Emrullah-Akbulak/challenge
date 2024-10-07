import styles from "./Footer.module.css";

import FooterItem from "./FooterItem/FooterItem";

function Footer() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.footerItemsWrapper}>
        <FooterItem>Imprint</FooterItem>
        <FooterItem>Terms & Conditions</FooterItem>
        <FooterItem>Privacy Statement</FooterItem>
      </div>
    </div>
  );
}

export default Footer;
