const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    image: String,
    name: String,
    ingredients: [String],
    instructions: String,
    userID: String
},
    {
        versionKey: false
    }
);

const RecipesModel = mongoose.model('Recipe', recipeSchema);

module.exports = RecipesModel;