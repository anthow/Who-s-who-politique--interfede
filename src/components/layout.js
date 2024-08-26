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
      <header className="w-full p-4 flex items-center justify-between head bg-gray-800">
        <span className="text-white font-black text-lg">
          {data.site.siteMetadata?.title || "Who's Who politique"}
        </span>
        <nav>
          <ul className="flex gap-5 items-center text-white">
            <li><Link to="/gouvernement">Gouvernement wallon</Link></li>
            <li><Link to="/parlement">Parlement wallon</Link></li>
            <li><Link to="/commision">Commision emploi</Link></li>
            <li><Link to="/attaches">Attachés parlementaires</Link></li>
            <li><Link to="/bureau">Bureau de parti</Link></li>
            <li><Link to="/autre">Autres</Link></li>
            <li>
              <button className="textbordeau bg-white px-3 py-1 rounded">Demande de modif</button>
            </li>
          </ul>
        </nav>
      </header>
      <main className="container mx-auto p-4">{children}</main>
      <footer className="w-full p-4 bg-gray-800 text-white text-center">
        <p>&copy; {new Date().getFullYear()} Who's Who politique. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Layout;
