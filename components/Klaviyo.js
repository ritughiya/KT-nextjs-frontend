'use client'
import Script from 'next/script'
import React, { useEffect, useState } from "react";


const Klaviyo = (props) => {
//     const [color, setColor] = useState('');


//     useEffect(() => {
//         console.log('change color');
//         setColor(props.formColor);

//           }, []);

//           var delayInMilliseconds = 500; // half a second

// setTimeout(function() { 

//    var iframe = document.getElementsByTagName('iframe')[0];
//    iframe.style.background = (props.formColor);
//    iframe.contentWindow.document.body.style.backgroundColor = (props.formColor);

// }, delayInMilliseconds);


    return (
        <>
         <iframe
        src={'/klaviyo-form'}
        height='50px'
        id="iframe"
      />
      {<div></div>}
    </>
    )
  }

  export default Klaviyo
