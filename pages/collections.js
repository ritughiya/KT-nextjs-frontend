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
import Masonry from 'react-masonry-css'
import Navigationcollection from "../components/Navigation-collection"



import { If, Elif, Else } from 'rc-if-else';

// import component 👇
import Drawer from 'react-modern-drawer'

//import styles 👇
import 'react-modern-drawer/dist/index.css'

const query = `*[_type == "collectionspage"] {
  pageTitle,
  collections[]->{
    collectionTitle,
    collectionDesc,
    size,
    backgroundImage
  }
}
`

const breakpointColumnsObj = {
  default: 2,
  800: 1
};

const CollectionsPage = ({ properties }) => {

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
    <div className="Collections wrapper">
      <Customhead />
      <Head>
        <title>Collections | Kassandra Thatcher</title>
        <meta property="og:title" content="Collections | Kassandra Thatcher" key="title" />
      </Head>
      <Navigationcollection />


      {properties.map(post => (
              
        <div key={post._id}>
        


        <div className="Collectionswrapper">
        <div className="copy">
          <div className="groupTitle">The Collections</div>

          <Masonry
  breakpointCols={breakpointColumnsObj}
  className="my-masonry-grid"
  columnClassName="my-masonry-grid_column">
          {post.collections && post.collections.map(({_id, slug = '', collectionTitle = '', collectionDesc = '', size = '', backgroundImage=''}) =>  (
                     <>
                     <If condition={size === "shorter"}>
                     <div key={_id} className="shortBlock Collectionblock grid-item">
                          <Link href="/collection/[slug]" as={`/collection/${slug.current}`} passHref>
                            <div className="pointer">
                            {collectionTitle && <div className="collectionTitle">{collectionTitle}</div>}
                            {collectionDesc && <div className="collectionDesc">{collectionDesc}</div>}
                          </div>
                      </Link>
                     </div>
                     </If>

                      <If condition={size === "longer"}>
                      <div key={_id} className="longBlock Collectionblock grid-item">
                           <Link href="/collection/[slug]" as={`/collection/${slug.current}`} passHref>
                             <div className="pointer">
                             {collectionTitle && <div className="collectionTitle">{collectionTitle}</div>}
                             {collectionDesc && <div className="collectionDesc">{collectionDesc}</div>}
                           </div>
                       </Link>
                      </div>
                      </If>
                      </>
                 
             ))
             }
</Masonry>
             </div>
             </div>

          
      </div>
      
      
            ))}

      

      <Footer />
      
    </div>
  )

}

export const getServerSideProps = async () => {
  const query = '*[ _type == "collectionspage"]{collections[]->}'
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

export default CollectionsPage