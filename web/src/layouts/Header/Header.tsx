import styles from "./Header.module.css";

import { ReactComponent as BabbelLogo } from "../../assets/svg/BabbelLogo.svg";
import Button from "../../components/Button/Button";

function Header() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <BabbelLogo />
        <Button>Log In</Button>
      </div>
    </div>
  );
}

export default Header;
