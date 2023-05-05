const { Router } = require('express');

const RecipesModel = require('../models/recipe.model');

const recipesRoute = Router();

recipesRoute.get('/', async (req, res) => {
    try {
        const recipes = await RecipesModel.find();
        res.send(recipes);
    }
    catch (err) {
        console.log('Something went wrong: ', err);
        res.send({ 'err': 'something went wrong' });
    }
});

recipesRoute.post('/create', async (req, res) => {
    const payload = req.body;
    try {
        await RecipesModel.create(payload);
        res.send({ 'msg': 'Recipe created successfully' });
    }
    catch (err) {
        console.log('Something went wrong: ', err);
        res.send({ 'err': 'something went wrong' });
    }
});

recipesRoute.patch('/update/:recipeID', async (req, res) => {
    const recipeID = req.params.recipeID;
    const payload = req.body;
    const userID = req.body.userID;

    try {
        const recipe = await RecipesModel.findOne({ _id: recipeID });

        if (userID === recipe.userID) {
            await RecipesModel.findByIdAndUpdate({ _id: recipeID }, payload);
            res.send({ 'msg': 'Recipe has been updated' });
        }
        else {
            res.send({ 'msg': 'not authorised' });
        }
    }
    catch (err) {
        console.log('Something went wrong: ', err);
        res.send({ 'err': 'something went wrong' });
    }
});

recipesRoute.delete('/delete/:recipeID', async (req, res) => {
    const recipeID = req.params.recipeID;
    const userID = req.body.userID;

    try {
        const recipe = await RecipesModel.findOne({ _id: recipeID });

        if (userID === recipe.userID) {
            await RecipesModel.findByIdAndDelete({ _id: recipeID });
            res.send({ 'msg': 'Recipe has been deleted' });
        }
        else {
            res.send({ 'msg': 'not authorised' });
        }
    }
    catch (err) {
        console.log('Something went wrong: ', err);
        res.send({ 'err': 'something went wrong' });
    }
});

module.exports = recipesRoute;