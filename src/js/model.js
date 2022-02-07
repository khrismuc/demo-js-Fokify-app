import { API_URL } from "./config";
import { getJSON } from "./helpers.js";
import { RES_PER_PAGE } from "./config";

export { API_URL } from "./config.js";

export const state = {
  recipe: {},
  search: { query: '', results: [], page: 1, resultPerPage: RES_PER_PAGE },
};

export const loadSearchResults = async function (query) {
  const data = await getJSON(`${API_URL}?search=${query}`);
  console.log(data);
  const { recipes } = data.data;
  state.search.results = recipes.map((rec) => {
    return {
      id: rec.id,
      title: rec.title,
      publisher: rec.publisher,
      imageUrl: rec["image_url"],
    };
  });
};

export const loadRecipe = async function (id) {
  try {
    const { data } = await getJSON(`${API_URL}/${id}`);

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
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPerPage = function(page = state.search.page){
    // if(Object.keys(state.search.results).length===0) return [];
    state.search.page = page;

    const start = (page - 1) * state.search.resultPerPage;
    const end = page * state.search.resultPerPage;
    return state.search.results.slice(start,end) ;

}


export const updateServing = function(newServing=8){
  console.log('update serving')
  // console.log(state.recipe)
  state.recipe.ingredients.forEach(ing=>ing.quantity = ing.quantity * newServing/state.recipe.servings)
  state.recipe.servings = newServing;
  // console.log(state.recipe)
}

