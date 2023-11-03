'use client'
import Script from 'next/script'

const Klaviyo = () => {
    return (
        <>
         <iframe
        src={'/klaviyo-form'}
        height='100px'
        className="w-full"
        id="iframe"
      />
      {<div></div>}
    </>
    )
  }

  export default Klaviyo
