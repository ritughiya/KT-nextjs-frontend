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
import Footer from "../components/Footerexpanded";
import Navigationinfo from "../components/Navigation-info";

// import component 👇
import Drawer from "react-modern-drawer";

//import styles 👇
import "react-modern-drawer/dist/index.css";

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
      // Read https://css-tricks.com/use-target_blank/
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

const AboutPage = ({ properties, footerproperties }) => {
  console.log(properties);

  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setActive] = useState(false);
  const [show, setShow] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
    setActive(!isActive);
  };
  const showRooms = () => {
    setShow(!show);
  };

  return (
    <>
      {properties.map((post) => (
        <div key={post._id}>
          <div
            className="About wrapper"
            style={{ backgroundColor: `#${post.pageColor}` }}
          >
            <Customhead />
            <Head>
              <title>Information | Kassandra Thatcher</title>
              <meta
                property="og:title"
                content="Information | Kassandra Thatcher"
                key="title"
              />
            </Head>

            <div>
              <div className="linkframe mobile">
                <div
                  className={`title ${isActive ? "porcelain" : null}`}
                  style={{ backgroundColor: `#${post.pageColor}` }}
                >
                  <div className="siteLogo pointer">
                    <Link href="https://k-thatcher.netlify.app" passHref>
                      KASSANDRA THATCHER STUDIO
                    </Link>
                  </div>

                  <div className="h2">
                    <button
                      className={` ${isActive ? "open" : null}`}
                      onClick={toggleDrawer}
                    >
                      <div className="bar-one" />
                      <div className="bar-two" />
                      <div className="bar-three" />
                    </button>
                    <Drawer
                      open={isOpen}
                      onClose={toggleDrawer}
                      direction="top"
                      className="topnav porcelain"
                      overlayOpacity="0"
                      height="94vh"
                    >
                      <div>
                        <ul>
                          <Link href="/collections" passHref>
                            <li>Collections</li>
                          </Link>
                          <Link href="/archive" passHref>
                            <li>Archive</li>
                          </Link>
                          <Link href="/information" passHref>
                            <li>Information</li>
                          </Link>
                        </ul>
                      </div>
                    </Drawer>
                  </div>
                </div>
              </div>
            </div>

            <div className="linkframe desktop">
              <div
                className="title"
                style={{ backgroundColor: `#${post.pageColor}` }}
              >
                <div className="pageTitle">Information</div>
                <Link href="/" passHref>
                  <div className="siteLogo pointer">
                    <Link href="https://k-thatcher.netlify.app" passHref>
                      KASSANDRA THATCHER STUDIO
                    </Link>
                  </div>
                </Link>
              </div>
              <Link href="/collections" passHref>
                <div
                  className="subtitle Leftsubtitle pointer"
                  style={{ backgroundColor: `#${post.pageColor}` }}
                >
                  Collections
                </div>
              </Link>
              <Link href="/archive" passHref>
                <div
                  className="subtitle Rightsubtitle pointer"
                  style={{ backgroundColor: `#${post.pageColor}` }}
                >
                  Archive
                </div>
              </Link>
            </div>

            <div className="Aboutdesc ">
              <div className="Abouthed">About</div>
              <div className="Abouttxt">
                {post.abouttext && (
                  <PortableText
                    blocks={post.abouttext}
                    serializers={serializers}
                  />
                )}
              </div>
            </div>

            <div className="Aboutdesc contactdesc">
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

            <div className="Aboutdesc stockdesc ">
              <div className="Abouthed">Stockists</div>
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

            <div className="Aboutdesc pressdesc ">
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
        </div>
      ))}

      <div className="Footercontainer">
        {/* <div className="Footercontainer" style={{ backgroundColor: `#${post.pageColor}` }}> */}
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
  const query =
    '*[ _type == "aboutpage"]{pageTitle, pageColor, abouttext, instagram, linkedin, email, stockists[]->, press[]->}';
  const properties = await sanityClient.fetch(query);

  const footerquery = `*[_type == "footer" ]{title, notes, instagram, email, privacyPolicy, credits1, credits2}`;
  const footerproperties = await sanityClient.fetch(footerquery);

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
      },
    };
  }
};

export default AboutPage;
