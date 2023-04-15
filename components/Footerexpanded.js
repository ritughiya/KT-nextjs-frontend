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
      <div className="Footerexpanded">

        <div className="flex text">
            <div class="subtext">
            All photography Kassandra Thatcher Studio unless otherwise noted. The MA SCONCE Collection and “Somethings a little angular about her” collection are photographed by Clayton Cotterell.
            </div>
            <div  className="links">
                <div>
                Instagram
                </div>
                <div>
                Email
                </div>
                <div>
                Privacy Policy
                </div>
            </div>
        </div>

        <div className="flexbetween">
            <div className="footerlogo">
            KASSANDRA THATCHER STUDIO 
            </div>
            <div className="credits">
            Web design by Cristhian Sabogal<br>
            </br>site Development by Ritu Ghiya
            </div>
        </div>


      </div>

    </div>

  );
}



