const fs = require('fs')
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const fileStorage = require("./fileStorage")

//Henter lagrede data
const data = fileStorage.loadData();

//Starter opp express, og skrur på public-mappen
const app = express()
const publicDirectoryPath = path.join(__dirname, "../public")
app.use(express.static(publicDirectoryPath))

//Bruker urlencoded-middleware, for å la oss få tilgang til request.body i post-forms
app.use(express.urlencoded({ extended: true }));

//Legger til Handlebars for å få til Server Side Rendering
const viewPath = path.join(__dirname, "../views/pages")
const partialsPath = path.join(__dirname, "../views/partials")
app.set("view engine", hbs)
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//Funksjon (handler) for å vise fremsiden
function hovedSideRute(request, response){
    response.render("index.hbs", {
        title: "TestTitle",
        content: ["Content A", "Content B", "Content C"]
    })
}

//Funksjon for å håndtere et skjema
function formHandler(request, response) {
    console.log(request.body);
    response.redirect("back");
}

//Legge inn funksjonen hovedSideRute, slik at denne 
//vises når noen åpner "topp-domenet" vårt
app.get('',hovedSideRute)

//Når noen poster til /sendInn, kjøres funksjonen formHandler
app.post("/sendInn", formHandler)

app.listen(3000, function() { 
    console.log("Server is up! Check http://localhost:3000")
})


//Funksjon (handler) for å vise about-siden
function aboutHandler(request, response){
    response.render("about.hbs")
}
//Legge inn funksjonen aboutHandler, slik at denne 
//kjøres når noen åpner adressen /about
app.get('/about',aboutHandler)


//Funksjon (handler) for å vise about-siden
function aboutHandler(request, response){
    response.render("about.hbs")
}
//Lager funksjonen som skal kjøres og knytter den 
//opp mot adressen /about
app.get('/about',(request,response) => {
    response.render("about.hbs")
})

