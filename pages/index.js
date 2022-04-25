import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useEffect, useState } from "react";
import Link from 'next/link'
import Script from 'next/script'
import { sanityClient, urlFor} from '../sanity'
import Static from 'next/image'
import Customhead from "../components/Customhead"


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

      {properties.map(post => (
              
        <div key={post._id}>
        <div className="linkframe">
          <div className="title">
          <div className="siteLogo pointer">KASSANDRA THATCHER</div>

          </div>
          <div className="horflex">
          <div className="subtitle Leftsubtitle pointer">
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
          <img className="Homebackground" draggable="false" src={urlFor(post.backgroundImage).url()} layout=
      "fill"
    objectFit="contain" placeholder="blur"
      />
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