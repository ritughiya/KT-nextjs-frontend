//Footer.js

/**
 * @jest-environment jsdom
 */

import React from "react";
import Head from 'next/head'
import Link from "next/link"



export default function Footer() {


  return (
    <div>
      <div className="Footerleft">

        <div className="">
          <a target="_blank" rel="noreferrer"  href="https://www.instagram.com/_kassandrathatcher_/">
          Instagram
          </a>
        </div>
        <div className="">
        <a target="_blank" rel="noreferrer"   href="mailto:kt@kassandrathatcher.com">
          Contact
          </a>
        </div>



      </div>

    </div>

  );
}



