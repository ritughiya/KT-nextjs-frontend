//Mobilemenu.js

/**
 * @jest-environment jsdom
 */

import React from "react";
import Link from 'next/link'
import Head from 'next/head'
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";


const Mobilemenu = ({ isActive, pageColor, toggleDrawer, isOpen, menuColor }) => {


  return (



    <div>
    <div className="linkframe mobile">
      <div className={`title ${isActive ? "porcelain green" : null}`}  style={{backgroundColor: pageColor}}>
        <div className="siteLogo pointer">
          <Link href="/" passHref>
            KASSANDRA THATCHER STUDIO
          </Link>
        </div>

        <div className="h2">
          <button
            className={` ${isActive ? "open" : null}`}
            onClick={toggleDrawer}
          >
            <div className="bar-one" />
            <div className="bar-two" />
            <div className="bar-three" />
          </button>
          <Drawer
            open={isOpen}
            onClose={toggleDrawer}
            direction="top"
            className="topnav"
            overlayOpacity="0"
            height="94vh"
            style={{backgroundColor: menuColor}}
          >
            <div>
              <ul>
                <Link href="/collections" passHref   style={{backgroundColor: menuColor}}>
                  <li>Collections</li>
                </Link>
                <Link href="/archive" passHref style={{backgroundColor: menuColor}}>
                  <li>Archive</li>
                </Link>
                <Link href="/information" passHref style={{backgroundColor: menuColor}}>
                  <li>Information</li>
                </Link>
              </ul>
            </div>
          </Drawer>
        </div>
      </div>
    </div>
  </div>

  );
}



export default Mobilemenu;
