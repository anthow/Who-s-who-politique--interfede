import * as React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import { GatsbyImage } from "gatsby-plugin-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin, faTwitter, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { faPhone, faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import CommentModule from "../components/CommentModule";


const AttachePage = ({ data }) => {
  if (!data || !data.datoCmsPersonne) {
    return <Layout>Data is not available</Layout>;
  }

  const personne = data.datoCmsPersonne;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white">
          {/* Header avec photo et infos principales */}
          <div className="md:flex">
            {/* Section gauche - Photo et contacts */}
            <div className="md:w-1/3 bg-gray-50 p-8">
              <div className="flex flex-col items-center space-y-6">
                {/* Photo */}
                <div className="relative">
                  {personne.photo && (
                    <GatsbyImage
                      image={personne.photo.gatsbyImageData}
                      alt={personne.photo.alt || `${personne.prNom} ${personne.nom}`}
                      className="w-48 h-48 rounded-full object-cover"
                      imgStyle={{ objectFit: "cover" }}
                    />
                  )}
                  {/* Logo du parti en overlay */}
                  {personne.parti?.logo && (
                    <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2">
                      <GatsbyImage
                        image={personne.parti.logo.gatsbyImageData}
                        alt={`${personne.parti.nom} logo`}
                        className="w-12 h-12"
                      />
                    </div>
                  )}
                </div>

                {/* Nom et parti */}
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {personne.prNom} {personne.nom}
                  </h1>
                  {personne.parti?.nom && (
                    <p className="text-lg text-gray-600">{personne.parti.nom}</p>
                  )}
                </div>

                {/* Réseaux sociaux */}
                <div className="flex space-x-4">
                  {personne.facebook && (
                    <a href={personne.facebook} className="text-blue-600 hover:text-blue-800 transition-colors">
                      <FontAwesomeIcon icon={faFacebook} size="lg" />
                    </a>
                  )}
                  {personne.instagram && (
                    <a href={personne.instagram} className="text-pink-600 hover:text-pink-800 transition-colors">
                      <FontAwesomeIcon icon={faInstagram} size="lg" />
                    </a>
                  )}
                  {personne.linkedin && (
                    <a href={personne.linkedin} className="text-blue-700 hover:text-blue-900 transition-colors">
                      <FontAwesomeIcon icon={faLinkedin} size="lg" />
                    </a>
                  )}
                  {personne.xTwitter && (
                    <a href={personne.xTwitter} className="text-gray-800 hover:text-gray-600 transition-colors">
                      <FontAwesomeIcon icon={faTwitter} size="lg" />
                    </a>
                  )}
                  {personne.tikTok && (
                    <a href={personne.tikTok} className="text-black hover:text-gray-700 transition-colors">
                      <FontAwesomeIcon icon={faTiktok} size="lg" />
                    </a>
                  )}
                </div>

                {/* Contact info */}
                <div className="w-full space-y-4">
                  {/* Téléphones */}
                  {(personne.numRoDeTLPhone || personne.numRoDeTLPhone2) && (
                    <div className="flex items-center space-x-3 text-gray-700">
                      <FontAwesomeIcon icon={faPhone} className="text-gray-500" />
                      <div className="flex flex-col">
                        {personne.numRoDeTLPhone && <span>{personne.numRoDeTLPhone}</span>}
                        {personne.numRoDeTLPhone2 && <span>{personne.numRoDeTLPhone2}</span>}
                      </div>
                    </div>
                  )}

                  {/* Emails */}
                  {(personne.mail || personne.mail2) && (
                    <div className="flex items-start space-x-3 text-gray-700">
                      <FontAwesomeIcon icon={faEnvelope} className="text-gray-500 mt-1" />
                      <div className="flex flex-col space-y-1">
                        {personne.mail && <span className="break-all">{personne.mail}</span>}
                        {personne.mail2 && <span className="break-all">{personne.mail2}</span>}
                      </div>
                    </div>
                  )}

                  {/* Adresse */}
                  {personne.adressePostale && (
                    <div className="flex items-start space-x-3 text-gray-700">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-500 mt-1" />
                      <div>
                        <p className="font-medium">Adresse professionnelle :</p>
                        <p className="text-sm">{personne.adressePostale}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Section droite - Informations détaillées */}
            <div className="md:w-2/3 p-8">
              <div className="space-y-6">
                {/* Statut */}
                {personne.statut?.nom && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Statut</h2>
                    <p className="text-lg text-gray-700">{personne.statut.nom}</p>
                  </div>
                )}

                {/* Fonction attaché */}
                {personne.fonctionAttach && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Fonction</h2>
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                      <p className="text-blue-800 font-medium">{personne.fonctionAttach}</p>
                    </div>
                  </div>
                )}

                {/* Attachés */}
                {personne.attach && personne.attach.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Attachés</h2>
                    <div className="space-y-2">
                      {personne.attach.map((attaché, index) => (
                        <div key={index} className="bg-gray-50 p-3">
                          <p className="font-medium text-gray-900">
                            {attaché.prNom} {attaché.nom}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Badges d'information */}
                <div className="flex flex-wrap gap-3">
                  {personne.circonscription?.nom && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-600 text-white">
                      Circonscription : {personne.circonscription.nom}
                    </span>
                  )}

                  {personne.effectifOuSupplAnt?.nom && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-600 text-white">
                      Membre {personne.effectifOuSupplAnt.nom}
                    </span>
                  )}
                </div>

                {/* Remarques */}
                {personne.remarquesCommentaires && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-red-600 pb-2">
                      Remarques / Commentaires
                    </h3>
                    <div className="bg-gray-50 p-4">
                      <p className="text-gray-700 leading-relaxed">{personne.remarquesCommentaires}</p>
                    </div>
                  </div>
                )}

                {/* Remarque coordonnées */}
                {personne.remarqueCoordonnEs && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <p className="text-yellow-800 italic">{personne.remarqueCoordonnEs}</p>
                  </div>
                )}

                {/* Module de commentaires */}
                <CommentModule personneId={personne.id} />
              </div>
            </div>
          </div>
        </div>


      </div>
    </Layout>
  );
};

export const query = graphql`
  query PersonnePageQuery($id: String!) {
    datoCmsPersonne(id: { eq: $id }) {
      prNom
      nom
      photo {
        gatsbyImageData(width: 200)
        alt
      }
      facebook
      instagram
      linkedin
      xTwitter
      tikTok
      numRoDeTLPhone
      numRoDeTLPhone2
      fonctionAttach
      mail
      mail2
      adressePostale
      remarqueCoordonnEs
      parti {
        logo {
          gatsbyImageData(width: 50)
        }
        nom
      }
      statut {
        nom
      }
      ministRe
      attach {
        prNom
        nom
      }
      remarquesCommentaires
      circonscription {
        nom
      }
      effectifOuSupplAnt {
        nom
      }

    }
  }
`;

export default AttachePage;
