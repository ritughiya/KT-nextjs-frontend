import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useEffect, useState } from "react";
import Link from 'next/link'
import Script from 'next/script'
import { sanityClient, urlFor} from '../sanity'
import Static from 'next/image'
import Customhead from "../components/Customhead"
import Footer from "../components/Footer"
import Navigationarchive from "../components/Navigation-archive"




const query = `*[_type == "archivepage"] {
  selectedWorks[]->{
    year,
    title,
    category,
    dimensions,
    status,
    includedcollection[]->,
    archiveimages[]->
  }
}
`

const ArchivePage = ({ properties }) => {

  return (
    <div className="Archive wrapper">
      <Customhead />
      <Head>
        <title>Archive | Kassandra Thatcher</title>
        <meta property="og:title" content="Archive | Kassandra Thatcher" key="title" />
      </Head>
      <Navigationarchive />

              
      {properties.map(post => (

<div key={post._id}>

         
          

<div className="worklist">
  <div className="sorting">
    <div className="sub subyear">Year</div>
    <div className="sub subproject">Project</div>
    <div className="sub subcat">Category</div>
    <div className="sub subdims">Dimensions</div>
    <div className="sub substatus">Status</div>

    </div>
          {post.selectedWorks && post.selectedWorks.map(({_id, year = '', title = '', category = '', dimensions = '', status = ''}) => (
  <div key={_id} className="Workitem">
  {year && <div className="Workyear">{year}</div>}
  {title && <div className="Workproject">{title}</div>}
  {category && <div className="Workcat">{category}</div>}
  {dimensions && <div className="Workdims">{dimensions}</div>}
  {status && <div className="Workstatus">{status}</div>}
</div>
                     
             ))
             }
             </div>
</div>





        
          ))}

<Footer />

          </div>
          
          

          

          
      
      

      

      
      
  )

}

export const getServerSideProps = async () => {
  const query = '*[ _type == "archivepage"]{selectedWorks[]->}'
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

export default ArchivePage