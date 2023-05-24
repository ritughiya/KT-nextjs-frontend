//Carousel.js
/**
 * @jest-environment jsdom
 */
import Image from "next/image";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { sanityClient, urlFor } from "../sanity";
import LightGallery from "lightgallery/react";
import { If, Elif, Else } from "rc-if-else";
import HorizontalScroll from "react-scroll-horizontal";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

const Carousel = ({ slides, background }) => {
  const onInit = () => {
  };

  const slideshowAmount = slides.slideshow.length;

  return (
    <div className="flexRight">
      {(() => {
        if (slideshowAmount > 1) {
          return (
            <>
              <HorizontalScroll reverseScroll={true}>
                <LightGallery
                  onInit={onInit}
                  speed={500}
                  plugins={[lgThumbnail]}
                  loop={true}
                  mode={"lg-fade"}
                  id={"container"}
                >
                  {slides.slideshow.map(
                    ({ _id, mainImage = "", alt = "" }, index) => (
                      <a key={index} href={urlFor(mainImage).url()}>
                        <div
                          className="workdetail"
                          style={{
                            position: "relative",
                            width: "405px",
                            height: "582px",
                            marginRight: "22px",
                          }}
                        >
                          {mainImage && (
                            <Image
                              className="placeholder"
                              src={urlFor(mainImage).url()}
                              layout="fill"
                              objectFit="cover"
                              alt={alt}
                            />
                          )}
                        </div>
                      </a>
                    )
                  )}
                </LightGallery>
              </HorizontalScroll>
            </>
          );
        } else {
          return (
            <>
              <div className="">
                <LightGallery
                  onInit={onInit}
                  speed={500}
                  plugins={[lgThumbnail]}
                  loop={true}
                  mode={"lg-fade"}
                  id={"container"}
                >
                  {slides.slideshow.map(
                    ({ _id, mainImage = "", alt = "" }, index) => (
                      <a key={index} href={urlFor(mainImage).url()}>
                        <div
                          className="workdetail"
                          style={{
                            position: "relative",
                            width: "405px",
                            height: "582px",
                            marginRight: "30px",
                          }}
                        >
                          {mainImage && (
                            <Image
                              className="placeholder"
                              src={urlFor(mainImage).url()}
                              layout="fill"
                              objectFit="cover"
                              alt={alt}
                            />
                          )}
                        </div>
                      </a>
                    )
                  )}
                </LightGallery>
              </div>
            </>
          );
        }
      })()}
    </div>
  );
};

export default Carousel;
