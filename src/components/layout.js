import * as React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import "../styles/global.css"; // Ensure you have global styles

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
    <>
    <header className="w-full p-4 flex items-center justify-between head"> 
      <span className="text-white font-black text-lg">
        {data.site.siteMetadata?.title || "Who's Who politique"}
      </span>
      <nav>
        <ul className="flex gap-5 items-center text-white">
          <li><Link to="/gouvernement" className="hover:text-gray-200">Gouvernement wallon</Link></li>
          <li><Link to="/parlement" className="hover:text-gray-200">Parlement wallon</Link></li>
          <li><Link to="/commision" className="hover:text-gray-200">Commision emploi</Link></li>
          <li><Link to="/attaches" className="hover:text-gray-200">Attachés parlementaires</Link></li>
          <li><Link to="/bureau" className="hover:text-gray-200">Bureau de parti</Link></li>
          <li><Link to="/autre" className="hover:text-gray-200">Autres</Link></li>
          <li>
           <a href="https://tally.so/r/3qOqV8" target="_blank">
             <button className="textbordeau bg-white px-3 py-1 rounded hover:bg-gray-200 transition-colors duration-300">Demande de modif</button>
           </a>
          </li>
        </ul>
      </nav>
    </header>
    <main className="container mx-auto p-4">
      {children}
    </main>
    <footer className="w-full p-4 bg-gray-800 text-white text-center">
      <p>&copy; {new Date().getFullYear()} Interfédé des CISP</p>
    </footer>
  </>
  );
};

export default Layout;
