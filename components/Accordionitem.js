//Accordionitem.js

/**
 * @jest-environment jsdom
 */
 import Head from 'next/head'
 import Image from 'next/image'
 import styles from '../styles/Home.module.css'
 import React, { useEffect, useState, useCallback } from "react";
 import Link from 'next/link'
 import Script from 'next/script'
 import { sanityClient, urlFor} from '../sanity'
 import Static from 'next/image'
 import Customhead from "../components/Customhead"


 
 const Accordionitem  = (props) => {

        // State to show/hide accordion
        const [show, setShow] = useState(false);
        const handleOpen = (index) => {
          setShow(!show); // Toggle accordion
        };


   return (
<>

    <div className={`Workcontainer Workborder ${show ? 'porcelain': null}`}>
          <div className={`Workitem ${show ? 'porcelain': null}`}  onClick={handleOpen}>
        {props.year && <div className="Workyear">{props.year}</div>}
        {props.title && <div className="Workproject">{props.title}</div>}
        {props.category && <div className="Workcat">{props.category}</div>}
        {props.dimensions && <div className="Workdims">{props.dimensions}</div>}
        {props.status && <div className="Workstatus">{props.status}</div>}

        </div>
      
         {show && (
        <div className="archiveimgContainer">
        {props.archiveimages && props.archiveimages.map(({_id, mainImage=''}) => (
          <img key={_id} className="archiveimage placeholder"  src={urlFor(mainImage).url()}></img>
        ))}</div>)} 
      
        </div>
   

 </>

   )
 }
 


 export default Accordionitem
