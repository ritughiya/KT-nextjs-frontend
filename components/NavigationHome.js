//Navigation.js

/**
 * @jest-environment jsdom
 */

import React from "react";
import Link from 'next/link'
import Head from 'next/head'
import { useState, useEffect, useCallback } from 'react';
import Div100vh from 'react-div-100vh'


// import component 👇
import Drawer from 'react-modern-drawer'

//import styles 👇
import 'react-modern-drawer/dist/index.css'



export default function Navigation() {

  const [isOpen, setIsOpen] = useState(false)
  const [isActive, setActive] = useState(false)
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
    setActive(!isActive);
  }
  return (
    <div>
      <div className="linkframe desktop">
        <div className="title">
          <div className="siteLogo pointer"><Link href="/" passHref>KASSANDRA THATCHER STUDIO</Link></div>

        </div>
        <div className="horflex">
          <Link href="/collections" passHref>
            <div className="subtitle Leftsubtitle pointer" >
              Collections
            </div>
          </Link>
          <Link href="/archive" passHref>
            <div className="subtitle Rightsubtitle pointer">
              Archive
            </div>
          </Link>
        </div>
        <Link href="/information" passHref>
          <div className="subtitle Bottomsubtitle pointer">
            Information
          </div>
        </Link>

      </div>
    </div>

  );
}





