//Accordionitem.js
/**
 * @jest-environment jsdom
 */
import React, { useEffect, useState, useCallback } from "react";
import { sanityClient, urlFor } from "../sanity";
import { If, Elif, Else } from "rc-if-else";
import Image from "next/image";

const Accordionitem = (props) => {
  const [show, setShow] = useState(false);
  const handleOpen = (index) => {
    setShow(!show); 
  };

  return (
    <>
      <If condition={props.archivestatus === "open"}>
        <div
          className={`Workcontainer Workborder ${show ? null : "porcelain"}`}
          onClick={handleOpen}
        >
          <div className={`Workitem ${show ? null : "porcelain"}`}>
            {props.year && <div className="Workyear">{props.year}</div>}
            {props.title && <div className="Workproject">{props.title}</div>}
            {props.category && <div className="Workcat">{props.category}</div>}
            {props.dimensions && (
              <div className="Workdims">{props.dimensions}</div>
            )}
            {props.status && <div className="Workstatus">{props.status}</div>}
          </div>
          <div
            className={` archiveimagecontainer Workcontainer  ${
              show ? null : "active"
            }`}
          >
            {props.archiveimages &&
              props.archiveimages.map(({ _id, mainImage = "", alt = "" }) => (
                <Image
                  key={_id}
                  className="archiveimage placeholder"
                  src={urlFor(mainImage).url()}
                  alt={alt}
                  width={300}
                  height={300}
                ></Image>
              ))}
          </div>
        </div>
      </If>
      <If condition={props.archivestatus === null}>
        <div
          className={`Workcontainer Workborder ${
            show ? "porcelain active" : null
          }`}
          onClick={handleOpen}
        >
          <div className={`Workitem ${show ? "porcelain" : null}`}>
            {props.year && <div className="Workyear">{props.year}</div>}
            {props.title && <div className="Workproject">{props.title}</div>}
            {props.category && <div className="Workcat">{props.category}</div>}
            {props.dimensions && (
              <div className="Workdims">{props.dimensions}</div>
            )}
            {props.status && <div className="Workstatus">{props.status}</div>}
          </div>
          <div className={` archiveimagecontainer  ${show ? "active" : null}`}>
            {props.archiveimages &&
              props.archiveimages.map(({ _id, mainImage = "", alt = "" }) => (
                <img alt={alt} key={_id} className="archiveimage placeholder" src={urlFor(mainImage).url()} />
              ))}
          </div>
        </div>
      </If>
    </>
  );
};

export default Accordionitem;
