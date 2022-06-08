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
import Accordionitem from "../components/Accordionitem.jsx"


import { If, Elif, Else } from 'rc-if-else';



const query = `*[_type == "archivepage"] {
  selectedWorks[]->{
    year,
    title,
    category,
    dimensions,
    status,
    archivestatus,
    includedcollection[]->,
    archiveimages[]->
  }
}
`

const ArchivePage = ({ properties }) => {


    // State to show/hide accordion
    const [show, setShow] = useState(false);
    const handleOpen = (index) => {
      setShow(!show); // Toggle accordion
    };

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

          {post.selectedWorks && post.selectedWorks.map(({_id, year = '', title = '', category = '', dimensions = '', status = '', archivestatus = '', archiveimages}, index) => (


  
// </div>
<div key={index} >
<Accordionitem year={year} title={title} category={category} dimensions={dimensions} status={status} archivestatus={archivestatus} archiveimages={archiveimages}/>
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
  const query = '*[ _type == "archivepage"]{selectedWorks[]->{year, title, category, dimensions, status, archivestatus, archiveimages[]->, includedcollection[]->}}'
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