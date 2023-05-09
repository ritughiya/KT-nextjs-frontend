//Customhead.js

/**
 * @jest-environment jsdom
 */

import React from "react";
import Link from 'next/link'
import Head from 'next/head'



export default function Customhead() {


  return (



    <Head>
      <title>Kassandra Thatcher</title>
      <meta charset="UTF-8" name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"></meta>
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:title" content="Kassandra Thatcher" />

    </Head>

  );
}



