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
  <meta 
    name="keywords" 
    content="ssfixturing, Pune fixturing, precision fixtures, custom fixtures, machining fixtures, precision engineering, automotive fixtures, aerospace fixtures, medical device fixturing, custom jigs and fixtures, stainless steel fixtures, machining tools, competitor alternative, long-tail keywords, Fixture, HYDRAULIC FIXTURE, FIXTURES, Hydraulic Manufacturer, VMC Fixture, HMC Fixture, Fixture Manufacturer, Hydraulic fixtures Pune, ssfixturing, ss fixturing Pune, fixturing Moshi, hydraulic fixture Bhosari, Pune machining fixtures, industrial fixtures Pune, hydraulic clamping systems, VMC and HMC fixtures, durable machining fixtures, precision clamping solutions, Pune fixture manufacturing, advanced machining tools, reliable fixturing solutions, custom hydraulic fixtures, high-precision machining tools, Pune hydraulic systems, VMC hydraulic fixtures, HMC hydraulic fixtures, Pune engineering solutions, professional fixturing services, Bhosari industrial fixtures, Moshi precision tools, machining accuracy solutions, SS Fixturing solutions, Pune industrial tools, high-quality fixtures Pune, Pune precision engineering, custom machining solutions, hydraulic fixture design Pune, accurate machining fixtures, efficient clamping solutions, Pune fixture experts, CNC fixtures, machining center fixtures, fixturing experts Pune, Pune manufacturing solutions, customized fixtures, fixturing equipment Pune, Pune mechanical fixtures, fixturing solutions India, high-performance fixtures, Pune tool manufacturing, precision tool solutions, fixture design and manufacturing, Pune hydraulic clamping, robust machining fixtures, Pune custom tools, Pune industrial clamping, top fixturing services, advanced fixture solutions, Pune manufacturing excellence, fixture innovation Pune, accurate fixturing systems, industrial tools Bhosari, Pune engineering tools, fixturing systems Pune, Pune machining accuracy, premium fixtures Pune, Pune custom fixture solutions, Pune hydraulic systems, fixture installation Pune, Pune VMC tools, HMC machining fixtures Pune, Pune industrial engineering, fixturing quality assurance, Pune machining efficiency, Pune custom engineering solutions, Pune fixture experts, durable fixturing tools, Pune hydraulic engineering, reliable machining fixtures, Pune VMC HMC fixtures, Pune precision tools, high-quality clamping systems, Pune fixture production, Pune engineering excellence, hydraulic systems design Pune, Pune machining innovation, Pune fixturing technology, fixture customization Pune, Pune manufacturing tools, Pune precision fixturing, Pune industrial solutions, Pune fixturing development, custom hydraulic tools Pune, Pune mechanical engineering, Pune precision manufacturing, Pune machining specialists, fixturing design experts, hydraulic clamping tools Pune, Pune machining centers, fixturing production Pune, Pune custom hydraulic solutions, industrial fixture manufacturing Pune, high-precision fixturing Pune, Pune custom VMC fixtures, Pune HMC hydraulic tools" 
  />
  <meta name="author" content="ssfixturing" />  
  <link rel="canonical" href="https://www.ssfixturing.com/" />
  <meta name="robots" content="index, follow" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="SS Fixturing | Precision Machining Fixtures in Pune" />
  <meta property="og:description" content="Explore SS Fixturing for high-quality VMC and HMC hydraulic and mechanical fixtures in Pune. Enhance your machining accuracy and productivity with our precision solutions." />
  <meta property="og:url" content="https://www.ssfixturing.com/" />
  <meta property="og:image" content="https://ssfixturing.com/assets/sslogo-DJIuhvMn.png" />

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Rambla:wght@400;700&display=swap" />

  <link rel="shortcut icon" type="image/png" href="/logo2.png" alt="icon" />
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