import Head from 'next/head'
import Image from 'next/image'
import Customhead from "../components/Customhead"

import Navigationreal from "../components/Navigation"
import { sanityClient, urlFor } from '../sanity'
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { EffectFade, Navigation, Pagination } from "swiper";

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




const query = `*[ _type == "homeslideshow"]{
    slideshow[]->{
      mainImage,
      alt,
  }
  }
  `
  
  const IndexPage = ({ properties }) => {

  
  
    return (
      <div className=" Home wrapper">
        <Customhead />
        <Navigationreal />


  
         {properties.map(post => (
  
          <div key={post._id}>

<Swiper
        spaceBetween={30}
        effect={"fade"}
         loop={true}
        navigation={true}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >

        {post.slideshow.map(({ _id, mainImage = '', alt = '' }) => (
                        <div className="" key={_id}>
                                    <SwiperSlide>
                                    {mainImage && <Image className="placeholder" src={urlFor(mainImage).url()} width="100%" height="100%" layout="fill" objectFit="cover" placeholder="blur"
                            blurDataURL={rgbDataURL(73, 71, 63)} alt={alt} />}
                                        </SwiperSlide>

                        </div>  
                    ))}

      </Swiper>

  
  

  
  
          </div>
  
  
        ))} 
  
  
  
  
  
      </div>
    )
  
  }
  
  export const getServerSideProps = async () => {
    const query = `*[ _type == "homeslideshow"]{
      slideshow[]->{
        mainImage,
        alt,
    }
  }`
  
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
  
  export default IndexPage