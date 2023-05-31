import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Script from "next/script";
import { sanityClient, urlFor } from "../sanity";
import Static from "next/image";
import Customhead from "../components/Customhead";
import Footer from "../components/Footerleft";
import Masonry from "react-masonry-css";
import { If, Elif, Else } from "rc-if-else";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import Mobilemenu from "../components/Mobilemenu";
const breakpointColumnsObj = {
  default: 2,
  800: 1,
};

const CollectionsPage = ({ properties, footerproperties, colorproperties }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setActive] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
    setActive(!isActive);
  };
  const pageColor = "#" + colorproperties[0].collectionspageColor;
  const menuColor = "#" + colorproperties[0].mobilemenuColor;
  return (
    <>
      <div
        className="Collections wrapper"
        style={{ backgroundColor: pageColor }}
      >
        <Customhead />
        <Head>
          <title>Collections | Kassandra Thatcher</title>
          <meta
            property="og:title"
            content="Collections | Kassandra Thatcher"
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
        </div>

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
        {properties.map((post) => (
          <div key={post._id}>
            <div className="pagePadding">
              <div className="pageHeader center">The Collections</div>

              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {post.collections &&
                  post.collections.map(
                    ({
                      _id,
                      slug = "",
                      collectionTitle = "",
                      size = "",
                      backgroundImage = "",
                    }) => (
                      <>
                        <div
                          key={_id}
                          className="longBlock Collectionblock grid-item"
                        >
                          <div className="blockbg pointer">
                            <Link
                              href="/collection/[slug]"
                              as={`/collection/${slug.current}`}
                              passHref
                            >
                              {backgroundImage && (
                                <Image
                                  key={_id}
                                  className="bgimage"
                                  src={urlFor(backgroundImage).url()}
                                  layout="fill"
                                  objectFit="cover"
                                ></Image>
                              )}
                            </Link>
                          </div>
                          <div className="blocktext">
                            <Link
                              href="/collection/[slug]"
                              as={`/collection/${slug.current}`}
                              passHref
                            >
                              <div className="pointer">
                                {collectionTitle && (
                                  <div className="collectionTitle">
                                    {collectionTitle}
                                  </div>
                                )}
                              </div>
                            </Link>
                          </div>
                        </div>
                      </>
                    )
                  )}
              </Masonry>
            </div>
          </div>
        ))}
      </div>

      <div
        className="Slugfooter Footercontainer"
        style={{ backgroundColor: pageColor }}
      >
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
              <Footer instagram={instagram} email={email} />
            </div>
          )
        )}
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  const query =
    '*[ _type == "collectionspage"]{pageTitle, pageColor, collections[]->}';
  const properties = await sanityClient.fetch(query);

  const footerquery = `*[_type == "footer" ]{title, notes, instagram, email, privacyPolicy, credits1, credits2}`;
  const footerproperties = await sanityClient.fetch(footerquery);

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
        footerproperties,
        colorproperties,
      },
    };
  }
};

export default CollectionsPage;
