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
  const [show, setShow] = useState(false)
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
    setActive(!isActive);
  }
  const showRooms = () => {
    setShow(!show);
  }



  return (
    <div>
      <div className="linkframe desktop">
        <div className="title">
          <div className="siteLogo pointer"><Link href="https://k-thatcher.netlify.app" passHref>KASSANDRA THATCHER STUDIO</Link></div>

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
      <div className="linkframe mobile">

        <div className={`title ${isActive ? 'porcelain' : null}`}>
          <div className="siteLogo pointer"><Link href="https://k-thatcher.netlify.app" passHref>KASSANDRA THATCHER STUDIO</Link></div>

          <div className="h2">
            <button className={` ${isActive ? 'open' : null}`} onClick={toggleDrawer}>
              <div className="bar-one" />
              <div className="bar-two" />
              <div className="bar-three" />
            </button>
            <Drawer
              open={isOpen}
              onClose={toggleDrawer}
              direction='top'
              className='topnav porcelain'
              overlayOpacity='0'
              height='94vh'
            >
              <div>
                <Div100vh>
                <ul>

                  <Link href="/collections" passHref><li>Collections</li></Link>
                  <Link href="/archive" passHref><li>Archive</li></Link>
                  <Link href="/information" passHref><li>Information</li></Link>

                </ul>
                </Div100vh>

              </div>
            </Drawer>

          </div>

        </div>


      </div>
    </div>

  );
}





