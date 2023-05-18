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

// Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
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

const Carousel = ({ slides }) => {
  const onInit = () => {
    console.log("lightGallery has been initialized");
  };

  const slideshowAmount = slides.slideshow.length;

  return (
    <div className="flexRight">
      {(() => {
        if (slideshowAmount > 2) {
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
                      <a key={_id} href={urlFor(mainImage).url()}>
                        <div
                          className="workdetail"
                          style={{
                            position: "relative",
                            width: "405px",
                            height: "582px",
                            marginRight: "30px",
                          }}
                          key={index}
                        >
                          {mainImage && (
                            <Image
                              className="placeholder"
                              src={urlFor(mainImage).url()}
                              width="100%"
                              height="100%"
                              layout="fill"
                              objectFit="cover"
                              placeholder="blur"
                              blurDataURL={rgbDataURL(73, 71, 63)}
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
              <div className="desktop">
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
                      <a key={_id} href={urlFor(mainImage).url()}>
                        <div
                          className="workdetail"
                          style={{
                            position: "relative",
                            width: "405px",
                            height: "582px",
                            marginRight: "30px",
                          }}
                          key={index}
                        >
                          {mainImage && (
                            <Image
                              className="placeholder"
                              src={urlFor(mainImage).url()}
                              width="100%"
                              height="100%"
                              layout="fill"
                              objectFit="cover"
                              placeholder="blur"
                              blurDataURL={rgbDataURL(73, 71, 63)}
                              alt={alt}
                            />
                          )}
                        </div>
                      </a>
                    )
                  )}
                </LightGallery>
              </div>

              <HorizontalScroll reverseScroll={true} className={"mobile"}>
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
                      <a key={_id} href={urlFor(mainImage).url()}>
                        <div
                          className="workdetail"
                          style={{
                            position: "relative",
                            width: "25vw",
                            height: "80vh",
                            marginRight: "10px",
                          }}
                          key={index}
                        >
                          {mainImage && (
                            <Image
                              className="placeholder"
                              src={urlFor(mainImage).url()}
                              width="100%"
                              height="100%"
                              layout="fill"
                              objectFit="cover"
                              placeholder="blur"
                              blurDataURL={rgbDataURL(73, 71, 63)}
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
        }
      })()}
    </div>
  );
};

export default Carousel;
