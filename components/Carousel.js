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
import gsap from "gsap";




const Carousel  = ({ slides, background }) => {
  let scrl = useRef(null);
  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);

  //Slide click
  const slide = (shift) => {
    scrl.current.scrollLeft += shift;
    setscrollX(scrollX + shift);

    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

    //Anim
    const anim = (e) => {
      gsap.from(e.target, { scale: 1 });
      gsap.to(e.target, { scale: 1.5 });
    };
    const anim2 = (e) => {
      gsap.from(e.target, { scale: 1.5 });
      gsap.to(e.target, { scale: 1 });
    };
  
    const scrollCheck = () => {
      setscrollX(scrl.current.scrollLeft);
      if (
        Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
        scrl.current.offsetWidth
      ) {
        setscrolEnd(true);
      } else {
        setscrolEnd(false);
      }
    };

  const onInit = () => {
  };

  const slideshowAmount = slides.slideshow.length;




  return (
    <div className="flexRight">
      {(() => {
        if (slideshowAmount > 1) {
          return (
            <>
      {scrollX !== 0 && (
        <button
          className="prev"
          onClick={() => slide(-500)}
        >
          <Image src="/arrow-left.svg" height={15} width={24} />
        </button>
      )}

{!scrolEnd && (
        <button
          className="next"
          onClick={() => slide(+500)}
        >
          <Image src="/arrow-right.svg" height={15} width={24} />
        </button>
      )}

                  <div className="carContainer"   ref={scrl} onScroll={scrollCheck} >
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
                            width: "403.21px",
                            height: "553px",
                            marginRight: "18px",
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
                            width: "403.21px",
                            height: "553px",
                            marginRight: "18px",
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
