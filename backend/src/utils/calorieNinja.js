import axios from "axios";

const CALORIE_NINJA_URL = "https://api.calorieninjas.com/v1/nutrition";
const API_KEY = process.env.CALORIE_NINJA_API_KEY;

export async function getNutritionalInfo(query) {
    try {
        const response = await axios.get(CALORIE_NINJA_URL, {
            params: { query: query },
            headers: {
                'X-Api-Key': API_KEY
            }
        });
        //console.log("Nutritional info response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching nutritional info:", error);
        throw error;
    }
}