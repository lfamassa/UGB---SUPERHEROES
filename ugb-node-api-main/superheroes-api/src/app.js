const express = require("express");
const sequelize = require("./database/database.js");
const Movie = require("./models/Movie.js");
const Hero = require("./models/Hero.js");
const heroRoutes = require("./routes/heroes.routes.js")

const app = express();
app.use(express.json());

Hero.belongsToMany(Movie, {
    through: "HeroMovies"
})

Movie.belongsToMany(Hero, {
    through: "MoviesHero"
})

app.use("/heroes", heroRoutes);

sequelize
    .sync()
    .then(() => { 
        console.log("Banco de Dados sincronizado.")
     })
    .catch((error) => { 
        console.log("Erro a sincronizar o banco.", error)
     })

module.exports = app;
