import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useEffect, useState } from "react";
import Link from 'next/link'
import Script from 'next/script'
import { sanityClient, urlFor } from '../sanity'
import Static from 'next/image'
import Customhead from "../components/Customhead"
import Footer from "../components/Footerright"
import Navigationarchive from "../components/Navigation-archive"
import Accordionitem from "../components/Accordionitem.jsx"



import { If, Elif, Else } from 'rc-if-else';

// import component 👇
import Drawer from 'react-modern-drawer'

const query = `*[_type == "archivepage"] {
  pageTitle,
  pageColor,
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

const ArchivePage = ({ properties, footerproperties }) => {

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
    <>


      {properties.map(post => (

        <div key={post._id}>

          <div className="Archive wrapper" style={{ backgroundColor: `#${post.pageColor}` }}>
            <Customhead />
            <Head>
              <title>Archive | Kassandra Thatcher</title>
              <meta property="og:title" content="Archive | Kassandra Thatcher" key="title" />
            </Head>

            <div>

              <div className="linkframe mobile">

                <div className={`title ${isActive ? 'porcelain' : null}`} style={{ backgroundColor: `#${post.pageColor}` }}>
                  <div className="siteLogo pointer"><Link href="https://k-thatcher.netlify.app" passHref>KASSANDRA THATCHER STUDIO</Link></div>

                  <div className="h2">
                    <button className={` ${isActive ? 'open' : null}`} onClick={toggleDrawer}>
                      <div className="bar-one" />
                      <div className="bar-two" />
                      <div className="bar-three" />
                    </button>
                    <Drawer
                      open={isOpen}
                      onClose={toggleDrawer}
                      direction='top'
                      className='topnav porcelain'
                      overlayOpacity='0'
                      height='94vh'
                    >
                      <div>
                        <ul>

                          <Link href="/collections" passHref><li>Collections</li></Link>
                          <Link href="/archive" passHref><li>Archive</li></Link>
                          <Link href="/information" passHref><li>Information</li></Link>

                        </ul>

                      </div>
                    </Drawer>

                  </div>

                </div>


              </div>
            </div>
            <Navigationarchive />

            <div className="linkframe desktop">
              <div className="title" style={{ backgroundColor: `#${post.pageColor}` }}>
                <div className="pageTitle">Archive</div>
                <Link href="/" passHref>
                  <div className="siteLogo pointer"><Link href="https://k-thatcher.netlify.app" passHref>KASSANDRA THATCHER STUDIO</Link></div>
                </Link>
              </div>
              <Link href="/collections" passHref>
                <div className="subtitle Leftsubtitle pointer" style={{ backgroundColor: `#${post.pageColor}` }}>
                  Collections
                </div>
              </Link>
              <Link href="/archive" passHref>
                <div className="subtitle Rightsubtitle pointer" style={{ backgroundColor: `#${post.pageColor}` }}>
                  Archive
                </div>
              </Link>
              <Link href="/information" passHref>
                <div className="subtitle Bottomsubtitle pointer" style={{ backgroundColor: `#${post.pageColor}` }}>
                  Information
                </div>
              </Link>





            </div>



            <div className="worklist">
              <div className="sorting">
                <div className="sub subyear">Year</div>
                <div className="sub subproject">Project</div>
                <div className="sub subcat">Category</div>
                <div className="sub subdims">Dimensions</div>
                <div className="sub substatus">Status</div>

              </div>

              {post.selectedWorks && post.selectedWorks.map(({ _id, year = '', title = '', category = '', dimensions = '', status = '', archivestatus = '', archiveimages }, index) => (



                // </div>
                <div key={index} >
                  <Accordionitem year={year} title={title} category={category} dimensions={dimensions} status={status} archivestatus={archivestatus} archiveimages={archiveimages} />
                </div>

              ))
              }
            </div>
          </div>
          </div>


          ))}

<div className="Archivefooter Footercontainer"> 

         {footerproperties.map(({ _id, title = '', notes= '', instagram = '', email='', privacyPolicy ='', credits1 = '', credits2 = ''}, index) => (


<div key={index}>
           <Footer instagram={instagram} email={email} />
    </div>




               ))}




    </div>

    </>



  )

}

export const getServerSideProps = async () => {
  const query = '*[ _type == "archivepage"]{pageTitle, pageColor, selectedWorks[]->{year, title, category, dimensions, status, archivestatus, archiveimages[]->, includedcollection[]->}}'
  const properties = await sanityClient.fetch(query)

  const footerquery = `*[_type == "footer" ]{title, notes, instagram, email, privacyPolicy, credits1, credits2}`
  const footerproperties = await sanityClient.fetch(footerquery)


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
        footerproperties,
      },
    }
  }
}

export default ArchivePage