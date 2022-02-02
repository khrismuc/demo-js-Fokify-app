import {API_URL} from "./config";
import {getJSON} from './helpers.js';
export const state = {recipe:{}}
export {API_URL} from './config.js';

export const loadRecipe = async function(id){
    try{

        const {data} = await getJSON(`${API_URL}/${id}?key=<insert your key>`)

        console.log(data);
        let { recipe } = data;
        console.log(recipe);
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe["source_url"],
            image: recipe["image_url"],
            servings: recipe.servings,
            cookingTime: recipe["cooking_time"],
            ingredients: recipe.ingredients,
        };
        console.log(recipe);
    }catch(err){
        throw err
    }

}
