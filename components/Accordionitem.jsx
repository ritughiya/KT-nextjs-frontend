//Accordionitem.js

/**
 * @jest-environment jsdom
 */
 import Head from 'next/head'
 import Image from 'next/image'
 import styles from '../styles/Home.module.css'
 import React, { useEffect, useState, useCallback } from "react";
 import Script from 'next/script'
 import { sanityClient, urlFor} from '../sanity'
 import Static from 'next/image'
 import Customhead from "./Customhead"

 import { If, Elif, Else } from 'rc-if-else';

 
 const Accordionitem  = (props) => {

  console.log(props)

        // State to show/hide accordion
        const [show, setShow] = useState(false);
        const handleOpen = (index) => {
          setShow(!show); // Toggle accordion
        };




   return (

     
<>
<If condition={props.archivestatus  === "open"}>
<div className={`Workcontainer Workborder ${show ? null: 'porcelain'}`}>
          <div className={`Workitem ${show ? null : 'porcelain'}`}  onClick={handleOpen}>
        {props.year && <div className="Workyear">{props.year}</div>}
        {props.title && <div className="Workproject">{props.title}</div>}
        {props.category && <div className="Workcat">{props.category}</div>}
        {props.dimensions && <div className="Workdims">{props.dimensions}</div>}
        {props.status && <div className="Workstatus">{props.status}</div>}

        </div>
      
        <div className={` archiveimagecontainer Workcontainer  ${show ? null : 'active'}`}>
        {props.archiveimages && props.archiveimages.map(({_id, mainImage='', alt=''}) => (
          <img key={_id} className="archiveimage placeholder"  src={urlFor(mainImage).url()} alt={alt}></img>
        ))}</div>
      
        </div>
</If>
<If condition={props.archivestatus  === null}>
<div className={`Workcontainer Workborder ${show ? 'porcelain': null}`}>
          <div className={`Workitem ${show ? 'porcelain': null}`}  onClick={handleOpen}>
        {props.year && <div className="Workyear">{props.year}</div>}
        {props.title && <div className="Workproject">{props.title}</div>}
        {props.category && <div className="Workcat">{props.category}</div>}
        {props.dimensions && <div className="Workdims">{props.dimensions}</div>}
        {props.status && <div className="Workstatus">{props.status}</div>}

        </div>
      
        <div className={` archiveimagecontainer Workcontainer  ${show ? 'active': null}`}>
        {props.archiveimages && props.archiveimages.map(({_id, mainImage='', alt=''}) => (
          <img key={_id} className="archiveimage placeholder"  src={urlFor(mainImage).url()} alt={alt}></img>
        ))}</div>
      
        </div>
</If>

   

 </>

   )
 }
 


 export default Accordionitem
