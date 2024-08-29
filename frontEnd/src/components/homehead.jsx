import { Helmet } from 'react-helmet-async';

export default function homeHead({title,description}){
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "SS Fixturing",
        "url": "https://www.ssfixturing.com",
        "logo": "https://ssfixturing.com/assets/sslogo-DJIuhvMn.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+919284550570",
          "contactType": "Customer Service",
          "areaServed": "IN",
          "availableLanguage": "English"
        },
        "sameAs": [
          "https://www.facebook.com/ssfixturing",
          "https://www.linkedin.com/company/ssfixturing"
        ]
      };
    
      const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "SS Fixturing",
        "image": "https://ssfixturing.com/assets/sslogo-DJIuhvMn.png",
        "@id": "",
        "url": "https://www.ssfixturing.com",
        "telephone": "+919284550570",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "W-106 s Block, M.I.D.C, Bhosari",
          "addressLocality": "Pune",
          "postalCode": "411026",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 18.6201,
          "longitude": 73.8131
        },
        "sameAs": [
          "https://www.facebook.com/ssfixturing",
          "https://www.linkedin.com/company/ssfixturing"
        ]
      };
    
    return(
        <>
        <Helmet>
            
    <title>
      {title}
    </title>
           <meta 
    name="description" 
    content={description}
  />



  {/* <link rel="shortcut icon" type="image/png" href="/logo2.png" alt="icon" /> */}
  <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
  </Helmet>
        </>
    )
}