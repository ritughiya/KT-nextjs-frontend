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
      <div className="Footerright">

        <div className="">
          <a target="_blank" href="https://www.instagram.com/_kassandrathatcher_/">
          Instagram
          </a>
        </div>
        <div className="">
        <a target="_blank" href="mailto:kt@kassandrathatcher.com">
          Contact
          </a>
        </div>



      </div>

    </div>

  );
}



