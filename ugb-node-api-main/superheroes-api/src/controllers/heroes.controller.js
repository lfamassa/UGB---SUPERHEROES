const Hero = require("../models/Hero.js");

function isNonEmptyString(value) {
    return typeof value === "string" && value.trim().length > 0;
}

async function list(req, res) {
    const heroes = await Hero.findAll();
    return res.status(200).json(heroes);
}

async function create(req, res) {
    const { name, universe, power } = req.body ?? {};
    if (![name, universe, power].every(isNonEmptyString)) {
        return res.status(400).json({
            message: "Nome, universo e poder são obrigatórios e devem ser textos não vazios."
        });
    }

    const hero = await Hero.create({ name, universe, power });
    return res.status(201).json(hero);
}

async function update(req, res) {
    const hero = await Hero.findByPk(req.params.id);
    if (!hero) {
        return res.status(404).json({ message: "Herói não encontrado." });
    }

    const { name, universe, power } = req.body ?? {};
    if (![name, universe, power].every(isNonEmptyString)) {
        return res.status(400).json({
            message: "Nome, universo e poder são obrigatórios e devem ser textos não vazios."
        });
    }

    await hero.update({ name, universe, power });
    return res.status(200).json(hero);
}

async function patch(req, res) {
    const hero = await Hero.findByPk(req.params.id);
    if (!hero) {
        return res.status(404).json({ message: "Herói não encontrado." });
    }

    const { name, universe, power } = req.body ?? {};
    const changes = Object.fromEntries(
        Object.entries({ name, universe, power }).filter(([, value]) => value !== undefined)
    );
    const values = Object.values(changes);
    if (values.length === 0 || !values.every(isNonEmptyString)) {
        return res.status(400).json({
            message: "Envie pelo menos um dos campos nome, universo ou poder com texto não vazio."
        });
    }

    await hero.update(changes);
    return res.status(200).json(hero);
}

async function deleteHero(req, res) {
    const hero = await Hero.findByPk(req.params.id);
    if (!hero) {
        return res.status(404).json({ message: "Herói não encontrado." });
    }

    await hero.destroy();
    return res.status(200).json({ message: "Herói excluído com sucesso." });
}

module.exports = {
    list,
    create,
    update,
    patch,
    deleteHero
};
