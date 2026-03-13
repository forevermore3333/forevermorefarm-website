const schema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Farm"],
  name: "Forevermore Farm",
  url: "https://forevermorefarmtn.com",
  description:
    "A regenerative farm in Lyles, Tennessee. Heritage Berkshire and Gloucestershire Old Spot pigs, straw bale gardens, and farm life 45 minutes from Nashville.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lyles",
    addressRegion: "TN",
    postalCode: "37098",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 35.9037,
    longitude: -87.3267,
  },
  areaServed: "Middle Tennessee",
  image: "https://forevermorefarmtn.com/images/property/stage-sunrise-fog-valley.jpg",
  sameAs: ["https://www.facebook.com/forevermorefarm"],
}

export default function FarmSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
