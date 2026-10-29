const Hero = require("../models/Hero.js");

async function list(req, res){
    const movies = await Hero.findAll()
    return res.status(200).json(movies);
}

module.exports = {
    list
};