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
import Footer from "../components/Footer"
import Navigationinfo from "../components/Navigation-info"



const query = `*[_type == "aboutpage"] {
    abouttext,
    instagram,
    linkedin,
    email,
    stockists[]->{
      city,
      storename
    }
}
`

const serializers = {
  types: {
    code: (props) => (
      <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre>
    ),
  },
  marks: {

    link: ({ mark, children }) => {
      // Read https://css-tricks.com/use-target_blank/
      const { blank, href } = mark
      return blank ?
        <a href={href} target="_blank" rel="noreferrer">{children}</a>
        : <a href={href}>{children}</a>
    }
  }
}


const AboutPage = ({ properties }) => {

  console.log(properties)



  return (
    <div className="About wrapper">
      <Customhead />
      <Head>
        <title>About | Kassandra Thatcher</title>
        <meta property="og:title" content="About | Kassandra Thatcher" key="title" />
      </Head>
      <Navigationinfo />


      
      {properties.map(post => (
              
        <div key={post._id}>

          <div className="Aboutdesc description">
            <div className="Abouthed">About</div>
            <div className="Abouttxt">

          {post.abouttext && 
               <PortableText 
            blocks = {post.abouttext}
            serializers={serializers}
          />}
          </div> 
          </div> 

          <div className="Aboutdesc contactdesc description">
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
            serializers={serializers}
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
            serializers={serializers}
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
            serializers={serializers}
          />}
          </div>
          </div>
          </div> 
          </div> 

          <div className="Aboutdesc contactdesc description">
            <div className="Abouthed">Stockists</div>
            <div className="Abouttxt stockistflex">
          {post.stockists && post.stockists.map(({_id, city = '', storename =''}) => (

            <div key={_id} className="stockistgroup">
              <div className="stockistcity">{city}</div>
              <div className="stockistname"><PortableText 
            blocks = {storename}
            serializers={serializers}
          /></div>
              </div>



          ))
          
          
          
          
          }</div></div>

          
          </div>
      
      
            ))}

      

<Footer />
  
      
    </div>
  )

}

export const getServerSideProps = async () => {
  const query = '*[ _type == "aboutpage"]{abouttext, instagram, linkedin, email, stockists[]->}'
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