import Link from "next/link";
import { useRouter } from "next/router";

import styles from '../styles/Home.module.css';

const NavItem = ({ text, href }) => {
    const router = useRouter();
    const currentRoute = router.pathname;
  return (
    <Link className={currentRoute === href
       ? styles.activeLink 
       : styles.nav__link} href={href}>
      <p className={styles.nav__link}>{text}</p>
    </Link>
  );
};

export default NavItem;