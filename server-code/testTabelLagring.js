//En fil som viser hvordan module tabellLagring kan benyttes
//Funksjonen hentTabell kjøres. Her blir filen tabell1.json laget viss den ikke eksisterer.
//
const tabellLagring = require("./tabellLagring.js")

let tabell1 = tabellLagring.hentTabell()

tabell1.push("Simon")
tabell1.push("Truls")

tabellLagring.lagreTabell("Test")