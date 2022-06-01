//Carousel.js

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
 import LightGallery from 'lightgallery/react';



// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";



 // Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
const keyStr =
'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

const triplet = (e1, e2, e3) =>
keyStr.charAt(e1 >> 2) +
keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
keyStr.charAt(e3 & 63)

const rgbDataURL = (r, g, b) =>
`data:image/gif;base64,R0lGODlhAQABAPAA${
  triplet(0, r, g) + triplet(b, 255, 255)
}/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`


 
 
 const Carousel  = ({slides}) => {

  console.log(slides)

  const onInit = () => {
    console.log('lightGallery has been initialized');
};
  

   return (



    <div className="flexRight">


            <LightGallery
                onInit={onInit}
                speed={500}
                plugins={[lgThumbnail]}
                loop={true}
                mode={'lg-fade'}
            >


{slides.slideshow.map(({_id, mainImage = '', alt =''}, index) => (
                <a key={_id} href={urlFor(mainImage).url()}>
                  <div className="workdetail" style={{ position: 'relative', width: '25vw', height: '77vh', marginRight: '10px' }} key={index}>
                    {mainImage && <Image className="placeholder"  src={urlFor(mainImage).url()} width="100%" height="100%" layout="fill" objectFit="cover" placeholder="blur"
 blurDataURL={rgbDataURL(73, 71, 63)}/> }
 </div>
                </a>

))}
            </LightGallery>
      
      </div>

 
   )
 }
 


 export default Carousel
