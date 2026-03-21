import type { Metadata } from "next"
import ContactForm from "./ContactForm"

export const metadata: Metadata = {
  title: "Contact | Forevermore Farm | Lyles, TN",
  description: "Get in touch with Forevermore Farm in Lyles, Tennessee. Reach out about events, farm stays, workshops, or media inquiries.",
  openGraph: {
    type: "website",
    title: "Contact | Forevermore Farm | Lyles, TN",
    description: "Get in touch with Forevermore Farm in Lyles, Tennessee. Reach out about events, farm stays, workshops, or media inquiries.",
    images: [
      {
        url: "/images/property/stage-sunrise-fog-valley.jpg",
        width: 1200,
        height: 630,
        alt: "The stage at Forevermore Farm overlooking a fog-filled valley at sunrise",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Forevermore Farm | Lyles, TN",
    description: "Get in touch with Forevermore Farm in Lyles, Tennessee. Reach out about events, farm stays, workshops, or media inquiries.",
    images: ["/images/property/stage-sunrise-fog-valley.jpg"],
  },
  alternates: {
    canonical: "/contact",
  },
}

export default function ContactPage() {
  return <ContactForm />
}
