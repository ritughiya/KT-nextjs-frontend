import '../styles/globals.css'
import Script from 'next/script'
import { sanityClient, urlFor } from '../sanity'
import Footer from "../components/Footerright"


function MyApp({ Component, pageProps }) {  return (
(  <>
          <Script id="analytics1"
         async type="text/javascript" 
        src={`https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=SSrDta`}
      />

<Component {...pageProps} />




</>
)  
  )
}



export default MyApp

