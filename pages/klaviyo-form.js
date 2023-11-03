import Script from 'next/script'

const KlaviyoForm = () => {
  
    return (
      <>
      <div className="klaviyo">
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

  export default KlaviyoForm;
