'use client'
import Script from 'next/script'
import React, { useEffect, useState } from "react";


const Klaviyo = (props) => {


    return (
        <>
         <iframe
        src={'/klaviyo-info'}
        height='50px'
        id="iframe"
      />
      {<div></div>}
    </>
    )
  }

  export default Klaviyo
