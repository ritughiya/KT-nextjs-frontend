//Navigation.js

/**
 * @jest-environment jsdom
 */

 import React from "react";
 import Link from 'next/link'
 import Head from 'next/head'
 import { useState, useEffect, useCallback } from 'react';

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
<div className="siteLogo pointer"><Link href="https://k-thatcher.netlify.app">KASSANDRA THATCHER STUDIO</Link></div>

</div>
<div className="horflex">
<div className="subtitle Leftsubtitle pointer" >
  <Link href="/collections">
  Collections
  </Link>
</div>
<div className="subtitle Rightsubtitle pointer">
<Link href="/archive">
Archive
</Link>
</div>
</div>
<div className="subtitle Bottomsubtitle pointer">
<Link href="/about">
Information
</Link>
</div>

</div>
<div className="linkframe mobile">

<div className={`title ${isActive ? 'porcelain': null}`}>
<div className="siteLogo pointer">KASSANDRA THATCHER STUDIO</div>

<div className="h2">
<button className={` ${isActive ? 'open': null}`} onClick={toggleDrawer}>
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
        <ul>

        <Link href="/collections"><li>Collections</li></Link>
        <Link href="/archive"><li>Archive</li></Link>
        <Link href="/about"><li>About</li></Link>

        </ul>
        
      </div>
  </Drawer>

</div>

</div>


</div>
</div>
 
   );
 }
 




