const fs = require("fs")
const path = require("path")

/**
 * Funksjon for å lagra en tabell til fil. Data vil lagres i JSON-formatet
 * Viss filen spesifisert ikke eksisterer blir filen laget.
 * @param {*} tabell Tabellen som skal lagres.
 * @param {*} filnavn Navn på fil som skal brukes. (Filen blir liggende i data mappen) 
 * Som standard blir den lagret i filen tabell1.json
 */

let lagreTabell = function (tabell, filnavn = "tabell1.json") {
    //Sjekker at tabell er en array
    if (tabell instanceof Array === false) {
        console.log("Paramteret tabell til funksjonen lagreTabell må være av typen Array!")
        console.log("Ingen data ble lagret")
        return
    }
    //Først gjør vi dataen om til tekst, etter Json standarden
    let filadresse = path.join(__dirname, "../data/"+filnavn)
    const dataSomJsonTekst = JSON.stringify(tabell)
    fs.writeFileSync(filadresse, dataSomJsonTekst)
    console.log("Lagring til fil gjennomført")
}

/**
 * Henter en tabell som er lagret som json-data i en fil
 * Viss filen ikke eksisterer blir filen laget, med json representasjonen av en tom tabell
 * 
 * @param {*} filnavn Navn på fil i mappen data som skal brukes.
 * Som standard bruker den filen tabell1.json
 * @returns Tabellen som ble hentet fra fil, konvertert fra Json til vanlig tabell/array
 */

let hentTabell = function(filnavn = "tabell1.json") {
    let filadresse = path.join(__dirname, "../data/"+filnavn)
    let data
    try {
        let dataInJsonFormat = fs.readFileSync(filadresse, "utf-8")
        data = JSON.parse(dataInJsonFormat)
    } catch (error) {
        if (error.code === "ENOENT") {
            console.log("File does not exist, creating it")   
            data = []
            fs.writeFileSync(filadresse,"[]")

        } else if (error instanceof SyntaxError) {
            console.log("Det er nok noe feil med data-filen din")
            console.log("-> En tom tabell-fil skal bare inneholde følgende tegn: []")
            console.log("Avslutter programmet")
            process.exit()
        } else {
            throw error
        }
    }
    if (Array.isArray(data) === false) {
        console.log("Det er en feil i filen " + filnavn + ". Du kan slette filen for å slette all data.")
        return []
    } else {
        return data
    }
}

exports.lagreTabell = lagreTabell
exports.hentTabell = hentTabell

