//En fil som viser hvordan module tabellLagring kan benyttes

//
const tabellLagring = require("./tabellLagring.js")

//Henter all data lagret i filen tabell1.json, 
//Her blir filen tabell1.json laget viss den ikke eksisterer.
//En kopi av dataen blir lagret i variabelen tabell1
let tabell1 = tabellLagring.hentTabell()

//Tabell1 utvides med to "celler"
tabell1.push("Simon")
tabell1.push("Truls")

//Alt som ligger i filen tabell1.json blir overskrevet med alt som nå liigger i 
//variabelen tabell1
tabellLagring.lagreTabell(tabell1)
