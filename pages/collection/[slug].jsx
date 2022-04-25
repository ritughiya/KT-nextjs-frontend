import {urlFor, sanityClient} from "../../sanity"
import { useState, useEffect } from 'react';
import Image from 'next/image'
import Link from "next/link"

import Customhead from "../../components/Customhead"
import Head from 'next/head'
import PortableText from '@sanity/block-content-to-react'

import { EffectFade, FreeMode, Navigation, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";


// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";




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

  
  


    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    

  return (
    <div className="Collections wrapper">
    <Customhead />
              
              <div>
                <div className="title">
                  <div className="pageTitle">Collections</div>
                <Link href="/">
                <div className="siteLogo">KASSANDRA THATCHER</div>
                </Link>
                <div>&nbsp;</div>
                </div>
               
                <div className="subtitle Rightsubtitle">
                <Link href="/archive">
                Archive
                </Link>
                </div>
                <div className="subtitle Bottomsubtitle">
                <Link href="/about">
                Information
                </Link>
                </div>
      
              <div className="Productswrapper">
              <div className="">

            <div>

              {selectedWorks && selectedWorks.map(({_id='', category='', title='', description='', specsheet='', slideshow=''}) => (
         <div key={_id}  className="productContainer copy"> 
         <div className="flexLeft">
         <div className="category">{category && category}</div>
         <div className="Worktitle">{title && title}</div>

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



             <div className="flexRight">
             {slideshow && 
              <Swiper
              onSwiper={setThumbsSwiper}  
              slidesPerView={2}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper"
              height={120}
              spaceBetween={5}
      
            >
             {slideshow.map(({_id, mainImage = '', alt =''}) => (

              
              <SwiperSlide key={_id}>
                              <div style={{ position: 'relative', width: '30vw', height: '80vh' }}>
                {mainImage && <Image className="placeholder" draggable="false" onDragStart="return false;" onContextMenu={(e)=> e.preventDefault()} src={urlFor(mainImage).url()} width="100%" height="120px" layout="fill" objectFit="cover" placeholder="blur"
            blurDataURL={rgbDataURL(73, 71, 63)}/> }</div>
                    
              </SwiperSlide> ))}
              
              </Swiper>
              }
              </div>



                    
              </div>
                           
        ))}
        </div>
                
                   </div>
                   </div>
      
                
            </div>
            
            
                  
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


