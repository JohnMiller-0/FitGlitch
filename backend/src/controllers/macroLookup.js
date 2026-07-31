
const CalorieNinja = require('../utils/calorieNinja');


const getMacroInfo = async (req, res) => {
    const query = req.query.query;

    if (!query) {
        return res.status(400).json({ message: 'Query parameter is required.' });
    }

    const ingredients = (await CalorieNinja.getNutritionalInfo(query)).items || [];
    console.log(ingredients);
    
    const trimmed = ingredients.map(ingredient => ({
        itemName: ingredient.name,
        calories: ingredient.calories,
        portionSize_g: ingredient.serving_size_g,
    }));

    console.log(trimmed);
    res.status(200).json(trimmed);
}

module.exports = {
    getMacroInfo
};