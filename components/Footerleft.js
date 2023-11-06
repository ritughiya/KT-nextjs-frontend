//Footerleft.js

/**
 * @jest-environment jsdom
 */

import React from "react";
import Head from 'next/head'
import Link from "next/link"
import PortableText from '@sanity/block-content-to-react'
import Klaviyo from "./Klaviyocollections.js";


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
      const { blank, href } = mark
      return blank ?
        <a href={href} target="_blank" rel="noreferrer">{children}</a>
        : <a href={href}>{children}</a>
    }
  }
}

const Footer = (props) => {
  

  return (

    <div>
      <div className="Footerleft">
        <div className="links2">
        <div className="l1">
        <PortableText
                    blocks={props.instagram}
                    serializers={serializers}
                  />
        </div>
        <div className="l2">
        <PortableText
                    blocks={props.email}
                    serializers={serializers}
                  />
        </div>
        </div>
        <div className="form formleft">
          <div className="signup">Newsletter Sign Up</div>
          <Klaviyo formColor={props.formColor} />
        </div>

  


      </div>

    </div>

  );
}



export default Footer


