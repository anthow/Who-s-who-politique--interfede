import * as React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import "../styles/global.css";
import PasswordPopup from "./pop_up";

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div>
      <PasswordPopup />
      
      <div className="flex flex-col min-h-screen">
        <header className="w-full p-4 flex flex-col head">
                     {/* Header desktop avec 3 colonnes */}
           <div className="hidden md:flex items-center justify-center w-full">
            {/* Colonne gauche : Titre */}
            <div className="flex-shrink-0">
              <Link 
                to="/" 
                className="text-white font-black text-base md:text-lg hover:text-gray-200 transition-colors duration-300"
                onClick={closeMenu}
              >
                {data.site.siteMetadata?.title || "Who's Who politique"}
              </Link>
            </div>
            
                         {/* Colonne centre : Menu sur 2 lignes */}
             <nav className="flex-1 flex justify-center">
               <div className="flex flex-col gap-2 text-center">
                 {/* Première ligne */}
                 <div className="flex gap-6">
                   <Link to="/attaches-jeholet" className="text-white text-sm hover:text-gray-200 transition-colors duration-300">Cabinet Jeholet</Link>
                   <Link to="/gouvernement" className="text-white text-sm hover:text-gray-200 transition-colors duration-300">Gouvernement wallon</Link>
                   <Link to="/parlement" className="text-white text-sm hover:text-gray-200 transition-colors duration-300">Parlement wallon</Link>
                 </div>
                 {/* Deuxième ligne */}
                 <div className="flex gap-6">
                   <Link to="/commission" className="text-white text-sm hover:text-gray-200 transition-colors duration-300">Commission emploi</Link>
                   <Link to="/attaches" className="text-white text-sm hover:text-gray-200 transition-colors duration-300">Attachés parlementaires</Link>
                   <Link to="/bureau" className="text-white text-sm hover:text-gray-200 transition-colors duration-300">Bureau de parti</Link>
                   <Link to="/federation" className="text-white text-sm hover:text-gray-200 transition-colors duration-300">Fédération WB</Link>
                 </div>
               </div>
             </nav>
            
            {/* Colonne droite : Bouton */}
            <div className="flex-shrink-0">
              <a 
                href="https://tally.so/r/wdK1Mo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="textbordeau bg-white px-4 py-2 rounded hover:bg-gray-200 transition-colors duration-300 text-sm font-medium"
              >
                Demande de modif
              </a>
            </div>
          </div>
          
          {/* Header mobile */}
          <div className="md:hidden flex items-center justify-between">
            <Link 
              to="/" 
              className="text-white font-black text-base md:text-lg hover:text-gray-200 transition-colors duration-300"
              onClick={closeMenu}
            >
              {data.site.siteMetadata?.title || "Who's Who politique"}
            </Link>
            
            {/* Bouton menu mobile */}
            <button
              className="text-white p-2"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
          {/* Bouton Demande de modif - toujours visible sur mobile */}
          <div className="md:hidden mt-4 flex justify-center">
            <a 
              href="https://tally.so/r/wdK1Mo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block textbordeau bg-white px-3 py-2 rounded hover:bg-gray-200 transition-colors duration-300 text-xs font-medium"
            >
              Demande de modif
            </a>
          </div>
          
          {/* Navigation mobile */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4">
              <ul className="flex flex-col gap-3 text-white text-sm">
                <li><Link to="/attaches-jeholet" className="block py-2 hover:text-gray-200 transition-colors duration-300" onClick={closeMenu}>Cabinet Jeholet</Link></li>
                <li><Link to="/gouvernement" className="block py-2 hover:text-gray-200 transition-colors duration-300" onClick={closeMenu}>Gouvernement wallon</Link></li>
                <li><Link to="/parlement" className="block py-2 hover:text-gray-200 transition-colors duration-300" onClick={closeMenu}>Parlement wallon</Link></li>
                <li><Link to="/commission" className="block py-2 hover:text-gray-200 transition-colors duration-300" onClick={closeMenu}>Commission emploi</Link></li>
                <li><Link to="/attaches" className="block py-2 hover:text-gray-200 transition-colors duration-300" onClick={closeMenu}>Attachés parlementaires</Link></li>
                <li><Link to="/bureau" className="block py-2 hover:text-gray-200 transition-colors duration-300" onClick={closeMenu}>Bureau de parti</Link></li>
                <li><Link to="/federation" className="block py-2 hover:text-gray-200 transition-colors duration-300" onClick={closeMenu}>Fédération WB</Link></li>
              </ul>
            </nav>
          )}
        </header>
        
        <main className="mx-auto p-4 flex-grow w-full max-w-7xl">
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
