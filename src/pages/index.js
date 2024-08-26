import { Link } from "gatsby";
import * as React from "react";
import Layout from "../components/layout";

const Section = ({ link, imageSrc, title }) => (
  <section className="border">
    {link ? (
      <Link to={link}>
        <img src={imageSrc} alt={title} className="w-full h-auto" />
        <div className="p-2 text-center">
          <h2>{title}</h2>
        </div>
      </Link>
    ) : (
      <>
        <img src={imageSrc} alt={title} className="w-full h-auto" />
        <div className="p-2 text-center">
          <h2>{title}</h2>
        </div>
      </>
    )}
  </section>
);

const IndexPage = () => {
  return (
    <Layout>
      <article className="flex w-10/12 m-auto flex-grow gap-10 items-center flex-wrap">
        <Section
        link="gouvernement"
          imageSrc="https://res.cloudinary.com/docshhbla/image/upload/c_fill,w_250,h_250,g_auto/v1720088385/Who%27s%20Who%20politique/pspw-Parlement_Wallon_ixs6kw.jpg"
          title="Le gouvernement wallon"
        />
        <Section
          link="parlement"
          imageSrc="https://res.cloudinary.com/docshhbla/image/upload/c_fill,w_250,h_250/v1720088385/Who%27s%20Who%20politique/parlement_shutterstock_ok_libre_de_droit_bkzv7a.jpg"
          title="Le parlement wallon"
        />
        <Section
          link="commision"
          imageSrc="https://res.cloudinary.com/docshhbla/image/upload/c_fill,w_250,h_250/v1720088385/Who%27s%20Who%20politique/parlement_shutterstock_ok_libre_de_droit_bkzv7a.jpg"
          title="La commission emploi"
        />
        <Section
          link="attaches"
          imageSrc="https://res.cloudinary.com/docshhbla/image/upload/c_fill,w_250,h_250/v1720088385/Who%27s%20Who%20politique/parlement_shutterstock_ok_libre_de_droit_bkzv7a.jpg"
          title="Attachés parlementaires"
        />
        <Section
          link="bureau"
          imageSrc="https://res.cloudinary.com/docshhbla/image/upload/c_fill,w_250,h_250/v1720088385/Who%27s%20Who%20politique/parlement_shutterstock_ok_libre_de_droit_bkzv7a.jpg"
          title="Bureau de parti"
        />
        <Section
          imageSrc="https://res.cloudinary.com/docshhbla/image/upload/c_fill,w_250,h_250/v1720088385/Who%27s%20Who%20politique/parlement_shutterstock_ok_libre_de_droit_bkzv7a.jpg"
          title="Autre"
        />
      </article>
    </Layout>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;
