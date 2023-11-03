import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { sanityClient, urlFor } from "../sanity";
import Static from "next/image";
import Customhead from "../components/Customhead";
import Footer from "../components/Footerright";
import Navigationarchive from "../components/Navigation-archive";
import Accordionitem from "../components/Accordionitem.jsx";
import { If, Elif, Else } from "rc-if-else";
import Drawer from "react-modern-drawer";
import Mobilemenu from "../components/Mobilemenu";
import PortableText from "@sanity/block-content-to-react";


const ArchivePage = ({ properties, footerproperties, colorproperties }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setActive] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
    setActive(!isActive);
  };

  const pageColor = "#" + colorproperties[0].archivepageColor;
  const menuColor = "#" + colorproperties[0].mobilemenuColor;

  console.log(properties)

  const works = properties[0].selectedWorks;

  console.log(works)

  return (
    <>
      <div className="Archive wrapper" style={{ backgroundColor: pageColor }}>
        <Customhead />
        <Head>
          <title>Archive | Kassandra Thatcher</title>
          <meta
            property="og:title"
            content="Archive | Kassandra Thatcher"
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
        <Navigationarchive />

        <div className="linkframe desktop">
          <div className="title" style={{ backgroundColor: pageColor }}>
            <div className="pageTitle">Archive</div>
            <Link href="/" passHref>
              <div className="siteLogo pointer">
                <Link href="/" passHref>
                  KASSANDRA THATCHER STUDIO
                </Link>
              </div>
            </Link>
          </div>
          <Link href="/collections" passHref>
            <div
              className="subtitle Leftsubtitle pointer"
              style={{ backgroundColor: pageColor }}
            >
              Collections
            </div>
          </Link>
          <Link href="/archive" passHref>
            <div
              className="subtitle Rightsubtitle pointer"
              style={{ backgroundColor: pageColor }}
            >
              Archive
            </div>
          </Link>
          <Link href="/information" passHref>
            <div
              className="subtitle Bottomsubtitle pointer"
              style={{ backgroundColor: pageColor }}
            >
              Information
            </div>
          </Link>
        </div>

        <div className="worklist">
          <div className="sorting">
            <div className="sub subyear">Year</div>
            <div className="sub subproject">Project</div>
            <div className="sub subcat">Collection</div>
            <div className="sub subdims">Dimensions</div>
            <div className="sub substatus">Status</div>
          </div>


              {works &&
                works.map(
                  (
                    {
                      _id="",
                      year = "",
                      title = "",
                      category = "",
                      dimensions = "",
                      status = "",
                      archivestatus = "",
                      archiveimages ="",
                    },
                    index
                  ) => (
                    <div key={index}>
                       <Accordionitem
                        year={year}
                        title={title}
                        category={category}
                        dimensions={dimensions}
                        status={status}
                        archivestatus={archivestatus}
                        archiveimages={archiveimages}
                      /> 
          
                    </div>
                  )
                )}
           
        </div>
      </div>

      <div
        className="Archivefooter Footercontainer"
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
              <Footer instagram={instagram} email={email} formColor={pageColor} />
            </div>
          )
        )}
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
   const query =  '*[ _type == "archivepage"]{selectedWorks[]->{_id, year, title,  category, dimensions, status, archivestatus, archiveimages[]->}}';
  // const query =  '*[ _type == "archivepage"]'
  const properties = await sanityClient.fetch(query);

  const footerquery = `*[_type == "footer" ]{title, notes, instagram, email, privacyPolicy, credits1, credits2}`;
  const footerproperties = await sanityClient.fetch(footerquery);

  const colorquery = `*[_type == "pagecolors" ]`;
  const colorproperties = await sanityClient.fetch(colorquery);

  if (!properties.length) {
    return null;
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

export default ArchivePage;
