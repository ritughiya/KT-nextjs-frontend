import { sanityClient, urlFor } from '../../sanity'
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image'
import Link from "next/link"

import Customhead from "../../components/Customhead"
import Head from 'next/head'
import PortableText from '@sanity/block-content-to-react'
import Navigationcollection from "../../components/Navigation-collection"
import Footer from "../../components/Footerleft"
import Slider from "../../components/Carousel"

import LightGallery from 'lightgallery/react';

// import component 👇
import Drawer from 'react-modern-drawer'

//import styles 👇
import 'react-modern-drawer/dist/index.css'


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


const serializers = {
  types: {
    code: (props) => (
      <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre>
    ),
  },
}


const Collection = ({
  collectionTitle,
  collectionDesc,
  size,
  backgroundImage,
  selectedWorks }) => {

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
    <div className="Collections Collectiondetail wrapper" >
      <Customhead />
      <Head>
        <title>{collectionDesc} | Kassandra Thatcher</title>
        <meta property="og:title" content="{collectionDesc} | Kassandra Thatcher" key="title" />
      </Head>

      <div>



        <div>

          <div className="linkframe mobile">

            <div className={`title ${isActive ? 'porcelain' : null}`} >
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

        <div className="desktop title" >
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
              <div className="subtitle Rightsubtitle pointer" >
                Archive
              </div>
            </Link>
          </div>
          <Link href="/information" passHref>
            <div className="subtitle Bottomsubtitle pointer" >
              Information
            </div>
          </Link>


        </div>


        <Navigationcollection />

        <div className="Productswrapper">

          <div className="">

            <div>

              {selectedWorks && selectedWorks.map(({ _id = '', category = '', title = '', description = '', material='', dimensions='', shade='', specsheet = '', slideshow = '' }) => (
                <div key={_id} className="copy Workborder">
                  {category && <div className="category mobile">{category}</div> }
                  <div className="Worktitle mobile">{title && title}</div>
                  <div className="productContainer">
                    <div className="flexLeft">
                      <div className="block">
                        <div className="Titleflex">
                      <div className="Worktitle desktop">{title && title}</div>
                      {category && <div className="category desktop">{category}</div> }
                      </div>


                      {description && <div className="description">
                        <PortableText
                          blocks={description}
                        /></div>}
                      {material && <div className="material">
                        <div className="subhed">Material</div>
                        <PortableText
                          blocks={material}
                        /></div>}
                      {dimensions && <div className="dimensions">
                      <div className="subhed">Dimensions</div>
                        <PortableText
                          blocks={dimensions}
                        /></div>}  
                      {shade && <div className="shade">
                      <div className="subhed">Shade</div>
                        <PortableText
                          blocks={shade}
                        /></div>}                    

                      </div>
                      <div className="blockContainer">

                        <div className="inquireBlock">
                          Inquire
                        </div>
                        {specsheet && <div className="specBlock">
                          <div className="specsheet">
                            <Link href={`${specsheet}`} passHref>
                              <a target="_blank" rel="noopener noreferrer">
                                Spec Sheet
                              </a>
                            </Link>
                          </div>
                        </div>}
                      </div>
                    </div>

                    <Slider slides={{ slideshow }} />


                  </div>

                </div>

              ))}
            </div>

          </div>
        </div>


      </div>

      {/* <Footer /> */}


    </div>
  )
}

export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug

  const query = `*[ _type == "collection" && slug.current == $pageSlug][0]{
        collectionTitle,
        collectionDesc,
        size,
        backgroundImage,
        selectedWorks[]->{
            title,
            description,
            material,
            dimensions,
            shade,
            year,
            category,
            status,
            specsheet,
            includedcollection,
            slideshow[]->{
                mainImage,
                alt,
            }
        }
    }`


  const collection = await sanityClient.fetch(query, { pageSlug })

  if (!collection) {
    return {
      props: null,
      notFound: true,
    }
  } else {
    return {
      props: {
        collectionTitle: collection.collectionTitle,
        collectionDesc: collection.collectionDesc,
        size: collection.size,
        backgroundImage: collection.backgroundImage,
        selectedWorks: collection.selectedWorks,



      },
    }
  }

}



export default Collection


