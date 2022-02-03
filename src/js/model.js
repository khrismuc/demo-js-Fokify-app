import {API_URL} from "./config";
import {getJSON} from './helpers.js';
export {API_URL} from './config.js';

export const state = {recipe:{}, search:{query:{},results:{}}}

export const loadSearchResults = async function(query){
    const data = await getJSON(`${API_URL}?search=${query}`)
    console.log(data)
    const {recipes} = data.data
    state.search.result=  recipes.map(rec=>{
        return{
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        sourceUrl: rec["source_url"]
        }
    })

    console.log(state.search.result)
}

export const loadRecipe = async function(id){
    try{

        const {data} = await getJSON(`${API_URL}/${id}`)

        let { recipe } = data;
        // console.log(recipe);
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
    }catch(err){
        throw err
    }

}
