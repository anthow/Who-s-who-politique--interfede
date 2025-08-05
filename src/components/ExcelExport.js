import * as React from "react"

const ExcelExport = ({ data, filename, sectionName = "" }) => {
  const exportToExcel = () => {
    // Debug: afficher les données récupérées
    console.log("Données pour export:", data)
    
    // Préparer les données pour l'export
    const exportData = data.map(({ node }) => {
      const row = {
        "Prénom": node.prNom || "",
        "Nom": node.nom || "",
        "Parti": node.parti?.nom || "",
        "Téléphone": node.numRoDeTLPhone || "",
        "Téléphone 2": node.numRoDeTLPhone2 || "",
        "Email": node.mail || "",
        "Email 2": node.mail2 || "",
        "Facebook": node.facebook || "",
        "Instagram": node.instagram || "",
        "LinkedIn": node.linkedin || "",
        "Twitter": node.xTwitter || "",
        "TikTok": node.tikTok || "",
        "Fonction": node.ministRe || node.fonctionAttach || "",
        "Statut": node.statut?.map(s => s.nom).join(", ") || "",
        "Attachés": node.attach?.map(a => `${a.prNom} ${a.nom}`).join(", ") || "",
        "Remarques": node.remarquesCommentaires || ""
      }
      
      // Debug: afficher chaque ligne
      console.log(`Données pour ${node.prNom} ${node.nom}:`, row)
      
      return row
    })

    // Créer le contenu CSV avec point-virgule pour Excel français
    const headers = Object.keys(exportData[0])
    const csvContent = [
      headers.join(";"),
      ...exportData.map(row => 
        headers.map(header => {
          const value = row[header] || ""
          // Échapper les guillemets dans les valeurs
          return `"${value.replace(/"/g, '""')}"`
        }).join(";")
      )
    ].join("\n")

    // Ajouter le BOM UTF-8 pour Excel
    const BOM = "\uFEFF"
    const csvWithBOM = BOM + csvContent

    // Debug: afficher le contenu CSV
    console.log("Contenu CSV:", csvWithBOM)

    // Créer et télécharger le fichier
    const blob = new Blob([csvWithBOM], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `${filename}${sectionName ? `_${sectionName}` : ""}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <button
      onClick={exportToExcel}
      className="text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300 flex items-center gap-2"
      style={{ backgroundColor: "#a40044" }}
      onMouseOver={(e) => e.target.style.backgroundColor = "#8a0039"}
      onMouseOut={(e) => e.target.style.backgroundColor = "#a40044"}
      title="Exporter les données de contact en Excel"
    >
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
      Export Excel
    </button>
  )
}

export default ExcelExport 