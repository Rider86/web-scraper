import Link from "next/link";
import React, { useState } from "react";
import NavItem from "./NavItem";

import styles from '../styles/Home.module.css';

const MENU_LIST = [
  { text: "Home", href: "/" },
  { text: "AFYA PHARMACY", href:"/afyaPharmacy" },
  { text: "366 PHARMACY", href: "/threeSixSixPharmacy" },
  { text: "REMEDIUM", href:"/remedium" },
  { text: "OPTIMA", href:"/optima" },
];
const Navbar = () => {
  
  const [navActive, setNavActive] = useState(null);
  const [activeIdx, setActiveIdx] = useState(-1);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link className={styles.heading} href="/">
          <h1 className={styles.heading}>Price checker</h1>
        </Link>
        <div
          onClick={() => setNavActive(!navActive)}
          className={styles.nav__menu_bar}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
              <div className={`${navActive ? styles.active : ""} ${styles.nav__menu_list}`}>
          {MENU_LIST.map((menu, idx) => (
            <div
              onClick={() => {
                setActiveIdx(idx);
                setNavActive(false);
              }}
              key={menu.text}
            >
              <NavItem active={activeIdx === idx} {...menu} />
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;