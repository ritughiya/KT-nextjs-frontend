import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useEffect, useState } from "react";
import Link from 'next/link'
import Script from 'next/script'
import { sanityClient, urlFor} from '../sanity'
import Static from 'next/image'
import Customhead from "../components/Customhead"
import PortableText from '@sanity/block-content-to-react'


const query = `*[_type == "aboutpage"] {
    abouttext[]->,
    instagram[]->,
    linkedin[]->,
    email[]->.
    stockists[]->{
      city,
      storename,
    }
}
`

const AboutPage = ({ properties }) => {

  return (
    <div className="About wrapper">
      <Customhead />

      {properties.map(post => (
              
        <div key={post._id}>
          <div className="title">
            <div className="pageTitle">Information</div>
          <Link href="/">
          <div className="siteLogo pointer">KASSANDRA THATCHER</div>
          </Link>
          </div>
         
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
          {/* <div className="subtitle Bottomsubtitle">
          <Link href="/about">
          Information
          </Link>
          </div> */}

          <div className="Aboutdesc description">
            <div className="Abouthed">About</div>
            <div className="Abouttxt">

          {post.abouttext && 
               <PortableText 
            blocks = {post.abouttext}
          />}
          </div> 
          </div> 

          <div className="Aboutdesc description">
            <div className="Abouthed">Contact</div>
            <div className="Abouttxt">
              <div className="socialgroup">
              <div className="Aboutsocial1">
                Instagram
                </div>
                <div className="Aboutsocial2">
          {post.instagram && 
               <PortableText 
            blocks = {post.instagram}
          />}
          </div>
          </div>

          <div className="socialgroup">
              <div className="Aboutsocial1">
                LinkedIn
                </div>
                <div className="Aboutsocial2">
          {post.linkedin && 
               <PortableText 
            blocks = {post.linkedin}
          />}
          </div>
          </div>

          <div className="socialgroup">
              <div className="Aboutsocial1">
                Email
                </div>
                <div className="Aboutsocial2">
          {post.email && 
               <PortableText 
            blocks = {post.email}
          />}
          </div>
          </div>
          </div> 
          </div> 


          
          {post.stockists && <div className="Stockistsflex">
          
          {post.stockists.map(({_id, city = '', storename = ''}) =>  (
            <div key={_id}>
                {city}
                {storename}
              </div>
                 
             ))
             }
             </div>}
          
          </div>
      
      
            ))}

      

      
      
    </div>
  )

}

export const getServerSideProps = async () => {
  const query = '*[ _type == "aboutpage"]'
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

export default AboutPage