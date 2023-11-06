import Script from 'next/script'
import { sanityClient, urlFor } from "../sanity";


const KlaviyoForm = ({ colorproperties }) => {

    const pageColor = "#" + colorproperties[0].archivepageColor;


  
    return (
      <>
      <div className="klaviyo" style={{ backgroundColor: pageColor }} >
  <Script
        src="//static.klaviyo.com/onsite/js/klaviyo.js?company_id=SSrDta"
        strategy="afterInteractive"
        id={'klaviyo'}
      />
<div className="klaviyo-form-UnCYVd"></div>
</div>
      </>
    );
  };

  export const getServerSideProps = async () => {

      const colorquery = `*[_type == "pagecolors" ]`;
      const colorproperties = await sanityClient.fetch(colorquery);
    
    
      if (!colorproperties.length) {
        return {
          props: {
            properties: [],
          },
        };
      } else {
        return {
          props: {
            colorproperties,
          },
        };
      }
    };

    export default KlaviyoForm;
