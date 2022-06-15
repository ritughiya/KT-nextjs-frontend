import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useEffect, useState } from "react";
import Link from 'next/link'
import Script from 'next/script'
import { sanityClient, urlFor } from '../sanity'
import Static from 'next/image'
import Customhead from "../components/Customhead"

import Navigation from "../components/Navigation"
import { If, Elif, Else } from 'rc-if-else';


// Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
const keyStr =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

const triplet = (e1, e2, e3) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63)

const rgbDataURL = (r, g, b) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`



const query = `*[_type == "homepage"] {
  _id,
  siteTitle,
  leftNavigation,
  leftColor,
  bottomNavigation,
  bottomColor,
  rightNavigation,
  rightColor,
  background,
  backgroundImage,
  backgroundImagecaption,
  backgroundVideo
}
`

const IndexPage = ({ properties }) => {
  // React State
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Access count value from session storage
    var pageView = sessionStorage.getItem("pageView");
    if (pageView == null) {
      // Initialize page views count
      pageView = 1;
    } else {
      // Increment count
      pageView = Number(pageView) + 1;
    }
    // Update session storage
    sessionStorage.setItem("pageView", pageView);
    setCount(pageView);
  }, []); //No dependency to trigger in each page load



  return (
    <div className=" Home wrapper">
      <Customhead />
      <Navigation />

      {properties.map(post => (

        <div key={post._id}>
          <>

            <If condition={post.background === "image"}>

              <Image className="Homebackground" draggable="false" src={urlFor(post.backgroundImage).url()} layout=
                "fill"
                objectFit="cover" alt={post.backgroundImagecaption}
              />

            </If>


            <If condition={post.background === "video"}>

              {/* <Image className="Homebackground" draggable="false" src={urlFor(post.backgroundImage).url()} layout=
"fill"
objectFit="cover" 
/> */}
              <div className="embed-container">
                <iframe loading="lazy" title="Video of Background" className="" src={post.backgroundVideo} width="640" height="360" frameBorder="0" allowFullScreen ></iframe>
              </div>

            </If>

          </>
        </div>


      ))}





    </div>
  )

}

export const getServerSideProps = async () => {
  const query = '*[ _type == "homepage"]'
  const properties = await sanityClient.fetch(query)

  if (!properties.length) {
    return {
      props: {
        properties: [],
      },
    }
  } else {
    return {
      props: {
        properties,
      },
    }
  }
}

export default IndexPage