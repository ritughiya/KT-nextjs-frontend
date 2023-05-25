import React, { useEffect, useState } from "react";
import Image from "next/image";
import Customhead from "../components/Customhead";
import NavigationHome from "../components/NavigationHome";
import Mobilemenu from "../components/Mobilemenu";
import { sanityClient, urlFor } from "../sanity";
import { Swiper, SwiperSlide } from "swiper/react";
import Div100vh from 'react-div-100vh'
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Navigation, Pagination } from "swiper";
const keyStr =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const triplet = (e1, e2, e3) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);
const rgbDataURL = (r, g, b) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

const IndexPage = ({ properties, colorproperties }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setActive] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
    setActive(!isActive);
  };
  const menuColor = "#" + colorproperties[0].mobilemenuColor;

  return (
    <Div100vh>
    <div className="Home wrapper">
      <Customhead />
      <NavigationHome />
      <Mobilemenu
            isActive={isActive}
            toggleDrawer={toggleDrawer}
            isOpen={isOpen}
            menuColor={menuColor}
          />
      {properties.map((post) => (
        <div key={post._id}>
              <Div100vh>
          <Swiper
            spaceBetween={30}
            effect={"fade"}
            loop={true}
            navigation={true}
            modules={[EffectFade, Navigation, Pagination]}
            className="mySwiper"
          >
            {post.slideshow.map(({ _id, mainImage = "", alt = "" }, index) => (
              <div className="" key={index}>
                <SwiperSlide>
                  {mainImage && (
                    <Image
                      className="placeholder"
                      src={urlFor(mainImage).url()}
                      layout="fill"
                      objectFit="cover"
                      alt={alt}
                    />
                  )}
                </SwiperSlide>
              </div>
            ))}
          </Swiper>
          </Div100vh>
        </div>
      ))}
    </div>
    </Div100vh>
  );
};

export const getServerSideProps = async () => {
  const query = `*[ _type == "homeslideshow"]{
    slideshow[]->{
      mainImage,
      alt,
  }
  }
  `;
  const properties = await sanityClient.fetch(query);
  const colorquery = `*[_type == "pagecolors" ]`;
  const colorproperties = await sanityClient.fetch(colorquery);

  if (!properties.length) {
    return {
      props: {
        properties: [],
      },
    };
  } else {
    return {
      props: {
        properties,
        colorproperties
      },
    };
  }
};

export default IndexPage;
