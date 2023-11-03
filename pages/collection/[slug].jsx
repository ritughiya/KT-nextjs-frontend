import { sanityClient, urlFor } from "../../sanity";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Customhead from "../../components/Customhead";
import Head from "next/head";
import PortableText from "@sanity/block-content-to-react";
import Footer from "../../components/Footerright";
// import Slider from "../../components/Carousel";
import Mobilemenu from "../../components/Mobilemenu";
import LightGallery from "lightgallery/react";
import dynamic from 'next/dynamic'

 
const Slider = dynamic(() => import('../../components/Carousel'), {
  ssr: false,
})

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
  const serializers = {
    types: {
      code: (props) => (
        <pre data-language={props.node.language}>
          <code>{props.node.code}</code>
        </pre>
      ),
    },
    marks: {
      link: ({ mark, children }) => {
        const { blank, href } = mark;
        return blank ? (
          <a href={href} target="_blank" rel="noreferrer">
            {children}
          </a>
        ) : (
          <a href={href}>{children}</a>
        );
      },
    },
  };
const Collection = ({
  collectionTitle,
  collectionDesc,
  size,
  backgroundImage,
  selectedWorks,
  footerproperties,
  colorproperties,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setActive] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
    setActive(!isActive);
  };
  const pageColor = "#" + colorproperties[0].collectionspageColor;
  const menuColor = "#" + colorproperties[0].mobilemenuColor;
  return (
    <div
      className="Collections Collectiondetail wrapper"
      style={{ backgroundColor: pageColor }}
    >
      <Customhead />
      <Head>
        <title>{collectionTitle} | Kassandra Thatcher</title>
        <meta
          property="og:title"
          content="{collectionDesc} | Kassandra Thatcher"
          key="title"
        />
      </Head>
      <div>
        <Mobilemenu
          isActive={isActive}
          pageColor={pageColor}
          toggleDrawer={toggleDrawer}
          isOpen={isOpen}
          menuColor={menuColor}
        />
        <div className="desktop title" style={{ backgroundColor: pageColor }}>
          <div className="pageTitle">
            <Link href="/collections" passHref>
              Collections
            </Link>
          </div>
          <Link href="/" passHref>
            <div className="siteLogo pointer">
              <Link href="/" passHref>
                KASSANDRA THATCHER STUDIO
              </Link>
            </div>
          </Link>
          <div>&nbsp;</div>
        </div>
        <div className="linkframe desktop">
          <div className="horflex">
            <Link href="/archive" passHref>
              <div
                className="subtitle Rightsubtitle pointer"
                style={{ backgroundColor: pageColor }}
              >
                Archive
              </div>
            </Link>
          </div>
          <Link href="/information" passHref>
            <div
              className="subtitle Bottomsubtitle pointer"
              style={{ backgroundColor: pageColor }}
            >
              Information
            </div>
          </Link>
        </div>
        <div className="Productswrapper">
          <div className="">
            <div>
              {selectedWorks &&
                selectedWorks.map(
                  ({
                    _id = "",
                    category = "",
                    title = "",
                    description = "",
                    material = "",
                    dimensions = "",
                    shade = "",
                    price ="",
                    specsheet = "",
                    slideshow = "",
                  }) => (
                    <div key={_id} className="pagePadding Workborder">
                      {category && (
                        <div className="category mobile">{category}</div>
                      )}
                      <div className="pageHeader left mobile">{title && title}</div>
                      <div className="productContainer">
                        <div className="flexLeft">
                          <div className="block">
                            <div className="Titleflex">
                              <div className="pageHeader left desktop">
                                {title && title}
                              </div>
                              {category && (
                                <div className="category desktop">
                                  {category}
                                </div>
                              )}
                            </div>

                            {description && (
                              <div className="description">
                                <PortableText blocks={description} />
                              </div>
                            )}
                            {material && (
                              <div className="material">
                                <div className="subhed">Material</div>
                                <PortableText blocks={material} />
                              </div>
                            )}
                            {dimensions && (
                              <div className="dimensions">
                                <div className="subhed">Dimensions</div>
                                <PortableText blocks={dimensions} />
                              </div>
                            )}
                            {shade && (
                              <div className="shade">
                                <div className="subhed">Shade</div>
                                <PortableText blocks={shade} />
                              </div>
                            )}
                            {price && (
                              <div className="price">
                                <div className="subhed">Price</div>
                                <PortableText blocks={price} />
                              </div>
                            )}
                          </div>
                          <div className="blockContainer">
                            {footerproperties.map(
          (
            {
              inquire = "",
            },
            index
          ) => (
            <>
            { inquire && ( 
                                        <div className="inquireBlock">
                                        <div key={index}>
                                              <PortableText blocks={inquire} />
            </div></div> )}
            </>
          )
        )}
        
                            {specsheet && (
                              <div className="specBlock">
                                <div className="specsheet">
                                  <Link href={`${specsheet}`} passHref>
                                    <a
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      Spec Sheet
                                    </a>
                                  </Link>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <Slider
                          background={{ pageColor }}
                          slides={{ slideshow }}
                        />
                      </div>
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
      </div>
      <div className="Slugfooter Footercontainer">
        {footerproperties.map(
          (
            {
              _id,
              title = "",
              notes = "",
              instagram = "",
              email = "",
              privacyPolicy = "",
              credits1 = "",
              credits2 = "",
            },
            index
          ) => (
            <div key={index}>
              <Footer instagram={instagram} email={email} formColor={pageColor} />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug;

  const footerquery = `*[_type == "footer" ]{title, notes, instagram, email, inquire, privacyPolicy, credits1, credits2}`;
  const footerproperties = await sanityClient.fetch(footerquery);

  const colorquery = `*[_type == "pagecolors" ]`;
  const colorproperties = await sanityClient.fetch(colorquery);

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
            price,
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
    }`;

  const collection = await sanityClient.fetch(query, { pageSlug });

  return {
    props: {
      collectionTitle: collection.collectionTitle,
      collectionDesc: collection.collectionDesc,
      size: collection.size,
      backgroundImage: collection.backgroundImage,
      selectedWorks: collection.selectedWorks,
      footerproperties,
      colorproperties,
    },
  };
};

export default Collection;
