//Navigation-archive.js

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
      <></>

   );
}





