//Footer.js

/**
 * @jest-environment jsdom
 */

import React from "react";
import Head from 'next/head'



export default function Footer() {


  return (
    <div>
      <div className="Footer">
        <div className="col1">
          2018-2021 © Kassandra Thatcher Studio<br></br>
          <span className="mobile"><br></br></span>
          All images by Jon Ervin and Kassandra Thatcher unless otherwise noted.
        </div>
        <div className="col2 desktop">
          KASSANDRA THATCHER STUDIO
        </div>
        <div className="col3">
          <div className="child1">Web design by Cristhian Sabogal<br></br>Development by Ritu Ghiya</div>
          <span className="mobile"><br></br></span>
          <div className="child2">
            <a target="_blank" href="https://www.instagram.com/_kassandrathatcher_/" rel="noopener noreferrer">INSTAGRAM</a><br></br><a target="_blank" href="mailto:studio@kassandrathatcher.com" rel="noopener noreferrer">EMAIL</a></div>

        </div>


      </div>
      <div className="col2 mobile">
        KASSANDRA THATCHER STUDIO
      </div>
    </div>

  );
}



