import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { sanityClient, urlFor } from "../sanity";
import Static from "next/image";
import Customhead from "../components/Customhead";
import PortableText from "@sanity/block-content-to-react";
import Mobilemenu from "../components/Mobilemenu";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("../components/Footerexpanded"), {
    ssr: false,
  });



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

const AboutPage = ({ properties, footerproperties, colorproperties }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setActive] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
    setActive(!isActive);
  };
  const pageColor = "#" + colorproperties[0].infopageColor;
  const menuColor = "#" + colorproperties[0].mobilemenuColor;

  return (
    <>

          <div
            className="About wrapper"
            style={{ backgroundColor: pageColor }}
          >
            <Customhead />
            <Head>
              <title>About | Kassandra Thatcher</title>
              <meta
                property="og:title"
                content="Information | Kassandra Thatcher"
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

            <div className="linkframe desktop">
              <div
                className="title"
                style={{ backgroundColor: pageColor }}
              >
                <div className="pageTitle">Information</div>
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
            </div>
            {properties.map((post) => (
        <div key={post._id}>
            <div className="Aboutpadding ">
              <div className="pageHeader center">About</div>
              <div className="Abouttxt">
                {post.abouttext && (
                  <PortableText
                    blocks={post.abouttext}
                    serializers={serializers}
                  />
                )}
              </div>
            </div>

            <div className="Aboutpadding contactdesc">
              <div className="Abouthed">Contact</div>
              <div className="Abouttxt">
                {post.instagram && (
                  <div className="socialgroup">
                    <div className="Aboutsocial1">Instagram</div>
                    <div className="Aboutsocial2">
                      <PortableText
                        blocks={post.instagram}
                        serializers={serializers}
                      />
                    </div>
                  </div>
                )}

                {post.linkedin && (
                  <div className="socialgroup">
                    <div className="Aboutsocial1">LinkedIn</div>
                    <div className="Aboutsocial2">
                      <PortableText
                        blocks={post.linkedin}
                        serializers={serializers}
                      />
                    </div>
                  </div>
                )}

                {post.email && (
                  <div className="socialgroup">
                    <div className="Aboutsocial1">Email</div>
                    <div className="Aboutsocial2">
                      <PortableText
                        blocks={post.email}
                        serializers={serializers}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="Aboutpadding stockdesc ">
              <div className="Abouthed">Partners</div>
              <div className="Abouttxt stockistflex">
                {post.stockists &&
                  post.stockists.map(({ _id, city = "", storename = "" }) => (
                    <div key={_id} className="stockistgroup">
                      <div className="stockistcity">{city}</div>
                      <div className="stockistname">
                        <PortableText
                          blocks={storename}
                          serializers={serializers}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="Aboutpadding pressdesc ">
              <div className="Abouthed">Press</div>
              <div className="Abouttxt pressflex">
                {post.press &&
                  post.press.map(
                    ({ _id, publication = "", articletitle = "" }) => (
                      <div key={_id} className="pubgroup">
                        <div className="publication">{publication}</div>
                        <div className="pubtitle">
                          <PortableText
                            blocks={articletitle}
                            serializers={serializers}
                          />
                        </div>
                      </div>
                    )
                  )}
              </div>
            </div>
          </div>
        ))}

        </div>


      <div className="Footercontainer" style={{ backgroundColor: pageColor }}>
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
              <Footer
                title={title}
                notes={notes}
                instagram={instagram}
                email={email}
                privacyPolicy={privacyPolicy}
                credits1={credits1}
                credits2={credits2}
              />
            </div>
          )
        )}
      </div>
    </>
  );
};

export const getServerSideProps = async () => {

const query = `*[_type == "aboutpage"] {
  pageTitle,
  pageColor,
    abouttext,
    igdemo,
    instagram,
    linkedin,
    email,
    press[]->{
      publication,
      articletitle
    },
    stockists[]->{
      city,
      storename
    }
}
`;
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

export default AboutPage;
