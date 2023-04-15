import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useEffect, useState, useCallback } from "react";
import Link from 'next/link'
import Script from 'next/script'
import { sanityClient, urlFor } from '../sanity'
import Static from 'next/image'
import Customhead from "../components/Customhead"
import Footer from "../components/Footerleft"
import Masonry from 'react-masonry-css'
import Navigationcollection from "../components/Navigation-collection"



import { If, Elif, Else } from 'rc-if-else';

// import component 👇
import Drawer from 'react-modern-drawer'

//import styles 👇
import 'react-modern-drawer/dist/index.css'

const query = `*[_type == "collectionspage"] {
  pageTitle,
  pageColor,
  collections[]->{
    collectionTitle,
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


  console.log(properties);

  return (
    <>

      {properties.map(post => (

        <div key={post._id}>

          <div className="Collections wrapper" style={{ backgroundColor: `#${post.pageColor}` }} >
            <Customhead />
            <Head>
              <title>Collections | Kassandra Thatcher</title>
              <meta property="og:title" content="Collections | Kassandra Thatcher" key="title" />
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

            <div className="desktop title" style={{ backgroundColor: `#${post.pageColor}` }}>
              <div className="pageTitle"  >
              <Link href="/collections" passHref>
Collections
</Link>
</div>
              <Link href="/" passHref>
                <div className="siteLogo pointer"><Link href="https://k-thatcher.netlify.app" passHref>KASSANDRA THATCHER STUDIO</Link></div>
              </Link>
              <div>&nbsp;</div>
            </div>
            <div className="linkframe desktop">

              <div className="horflex">
                <Link href="/archive" passHref>
                  <div className="subtitle Rightsubtitle pointer" style={{ backgroundColor: `#${post.pageColor}` }}>
                    Archive
                  </div>
                </Link>
              </div>
              <Link href="/information" passHref>
                <div className="subtitle Bottomsubtitle pointer" style={{ backgroundColor: `#${post.pageColor}` }}>
                  Information
                </div>
              </Link>


            </div>

            <div className="copy">
              <div className="groupTitle">The Collections</div>

              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
                {post.collections && post.collections.map(({ _id, slug = '', collectionTitle = '', size = '', backgroundImage = '' }) => (
                  <>
                    <If condition={size === "shorter"}>
                      <div key={_id} className="shortBlock Collectionblock grid-item">
                        <div className="blockbg pointer">
                          <Link href="/collection/[slug]" as={`/collection/${slug.current}`} passHref>
                            {backgroundImage && <Image key={_id} className="bgimage" src={urlFor(backgroundImage).url()} height="60vh" layout="fill" objectFit="cover"></Image>}
                          </Link>
                        </div>
                        <div className="blocktext">
                          <Link href="/collection/[slug]" as={`/collection/${slug.current}`} passHref>
                            <div className="pointer">
                              {collectionTitle && <div className="collectionTitle">{collectionTitle}</div>}
                            </div>
                          </Link>
                        </div>
                      </div>
                    </If>

                    <If condition={size === "longer"}>
                      <div key={_id} className="longBlock Collectionblock grid-item">
                        <div className="blockbg pointer">
                          <Link href="/collection/[slug]" as={`/collection/${slug.current}`} passHref>
                            {backgroundImage && <Image key={_id} className="bgimage" src={urlFor(backgroundImage).url()} height="90vh" layout="fill" objectFit="cover"></Image>}
                          </Link>
                        </div>
                        <div className="blocktext">
                          <Link href="/collection/[slug]" as={`/collection/${slug.current}`} passHref>
                            <div className="pointer">
                              {collectionTitle && <div className="collectionTitle">{collectionTitle}</div>}
                            </div>
                          </Link>
                        </div>
                      </div>
                    </If>
                  </>

                ))
                }
              </Masonry>
            </div>
          </div>

          <div className="Footercontainer" style={{ backgroundColor: `#${post.pageColor}` }}>
            <Footer /></div>

        </div>


      ))}




    </>

  )

}

export const getServerSideProps = async () => {
  const query = '*[ _type == "collectionspage"]{pageTitle, pageColor, collections[]->}'
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