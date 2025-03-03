import * as React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import "../styles/global.css"; // Assure-toi d'avoir des styles globaux
import Search from "../components/search";
import PasswordPopup from "./pop_up";

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div>
      <PasswordPopup /> {/* Affiche le pop-up pour mot de passe */}
      
      <div className="flex flex-col min-h-screen">
        <header className="w-full p-4 flex items-center justify-between head">
          <Link to="/" className="text-white font-black text-base">
            {data.site.siteMetadata?.title || "Who's Who politique"}
          </Link>
          <nav>
            <ul className="flex gap-4 items-center text-white text-sm whitespace-nowrap">
              <li><Link to="/gouvernement" className="hover:text-gray-200">Gouvernement wallon</Link></li>
              <li><Link to="/parlement" className="hover:text-gray-200">Parlement wallon</Link></li>
              <li><Link to="/commision" className="hover:text-gray-200">Commision emploi</Link></li>
              <li><Link to="/attaches" className="hover:text-gray-200">Attachés parlementaires</Link></li>
              <li><Link to="/bureau" className="hover:text-gray-200">Bureau de parti</Link></li>
              <li><Link to="/federation" className="hover:text-gray-200">Fédération WB</Link></li>
              <li className="flex flex-col gap-5">
                <a href="https://tally.so/r/wdK1Mo" target="_blank" rel="noopener noreferrer">
                  <button className="textbordeau bg-white px-2 py-1 rounded hover:bg-gray-200 transition-colors duration-300 text-xs">
                    Demande de modif
                  </button>
                </a>
              </li>
            </ul>
          </nav>
        </header>

        <main className="mx-auto p-4 flex-grow">
          {children}
        </main>

        <footer className="w-full p-4 bg-gray-800 text-white text-center">
          <p>&copy; {new Date().getFullYear()} Interfédération des CISP</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
