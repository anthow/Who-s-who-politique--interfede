import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"

const Section = ({ link, imageSrc, title }) => (
  <section className="border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
    {link ? (
      <Link to={link} className="block h-full">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="p-4 text-center bg-white">
          <h2 className="rubrique-small text-gray-800">{title}</h2>
        </div>
      </Link>
    ) : (
      <>
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="p-4 text-center bg-white">
          <h2 className="rubrique-small text-gray-800">{title}</h2>
        </div>
      </>
    )}
  </section>
)

const IndexPage = () => {
  const sections = [
    {
      link: "gouvernement",
      imageSrc: "https://res.cloudinary.com/docshhbla/image/upload/c_fill,w_250,h_250,g_auto/v1720088385/Who%27s%20Who%20politique/pspw-Parlement_Wallon_ixs6kw.jpg",
      title: "Le gouvernement wallon"
    },
    {
      link: "parlement",
      imageSrc: "https://res.cloudinary.com/docshhbla/image/upload/c_fill,w_250,h_250/v1720088385/Who%27s%20Who%20politique/parlement_shutterstock_ok_libre_de_droit_bkzv7a.jpg",
      title: "Le parlement wallon"
    },
    {
      link: "commission",
      imageSrc: "https://res.cloudinary.com/docshhbla/image/upload/c_fill,w_250,h_250/v1720088385/Who%27s%20Who%20politique/parlement_shutterstock_ok_libre_de_droit_bkzv7a.jpg",
      title: "La commission emploi"
    },
    {
      link: "bureau",
      imageSrc: "https://res.cloudinary.com/docshhbla/image/upload/c_fill,w_250,h_250/v1720088385/Who%27s%20Who%20politique/parlement_shutterstock_ok_libre_de_droit_bkzv7a.jpg",
      title: "Bureau de parti"
    },
    {
      link: "federation",
      imageSrc: "https://res.cloudinary.com/docshhbla/image/upload/c_fill,w_250,h_250/v1720088385/Who%27s%20Who%20politique/parlement_shutterstock_ok_libre_de_droit_bkzv7a.jpg",
      title: "Fédération WB"
    },
    {
      link: "attaches",
      imageSrc: "https://res.cloudinary.com/docshhbla/image/upload/c_fill,w_250,h_250/v1720088385/Who%27s%20Who%20politique/parlement_shutterstock_ok_libre_de_droit_bkzv7a.jpg",
      title: "Attachés parlementaires"
    }
  ]

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Suppression du header avec titre et sous-titre */}
        <article className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {sections.map((section, index) => (
            <Section key={index} link={section.link} imageSrc={section.imageSrc} title={section.title} />
          ))}
        </article>
        <div className="text-center mt-12">
          <p className="text-body text-gray-600 mb-4">Besoin de modifier des informations ?</p>
          <a href="https://tally.so/r/wdK1Mo" target="_blank" rel="noopener noreferrer" className="inline-block bg-bordeau text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-300 font-medium">
            Demander une modification
          </a>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage

export const Head = () => (
  <>
    <title>Who's Who politique - Interfédération des CISP</title>
    <meta name="description" content="Découvrez les acteurs politiques de la Wallonie et de Bruxelles. Gouvernement, parlement, commissions et plus encore." />
    <meta name="keywords" content="politique, wallonie, bruxelles, gouvernement, parlement, CISP" />
  </>
)
