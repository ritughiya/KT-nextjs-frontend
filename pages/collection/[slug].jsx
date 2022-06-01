import { sanityClient, urlFor} from '../../sanity'
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image'
import Link from "next/link"

import Customhead from "../../components/Customhead"
import Head from 'next/head'
import PortableText from '@sanity/block-content-to-react'
import Navigationcollection from "../../components/Navigation-collection"
import Footer from "../../components/Footer"
import Slider from "../../components/Carousel"

import LightGallery from 'lightgallery/react';



// Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
const keyStr =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

const triplet = (e1, e2, e3) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63)

const rgbDataURL = (r, g, b) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
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
    selectedWorks
}) => {


  

  return (
    <div className="Collections Collectiondetail wrapper">
    <Customhead />
    <Head>
        <title>{collectionDesc} | Kassandra Thatcher</title>
        <meta property="og:title" content="{collectionDesc} | Kassandra Thatcher" key="title" />
      </Head>
              
              <div>
            <Navigationcollection />
      
              <div className="Productswrapper">
                
              <div className="">

            <div>

              {selectedWorks && selectedWorks.map(({_id='', category='', title='', description='', specsheet='', slideshow=''}) => (
         <div key={_id}  className="copy Workborder"> 
         <div className="category mobile">{category && category}</div>
         <div className="Worktitle mobile">{title && title}</div>
         <div className="productContainer">
         <div className="flexLeft">
         <div className="category desktop">{category && category}</div>
         <div className="Worktitle desktop">{title && title}</div>

        {description && <div className="description">
               <PortableText 
            blocks = {description}
          /></div> }

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
             </div> }
             </div>
             </div>

<Slider slides={{slideshow}}/>


</div>

</div>
                           
                           ))}
                           </div>
                                   
                                      </div>
                                      </div>
                         
                                   
                               </div>
                               
                               <Footer />
                   
                                     
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


