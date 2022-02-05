import { API_URL } from "./config";
import { getJSON } from "./helpers.js";
import { RES_PER_PAGE } from "./config";

export { API_URL } from "./config.js";

export const state = {
  recipe: {},
  search: { query: {}, results: {}, page: 1, resultPerPage: RES_PER_PAGE },
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

export const getSearchResultsPerPage = function(page = 1){
    // console.log('page',page);
    state.search.page = page;

    const start = (page - 1) * RES_PER_PAGE;
    const end = page * RES_PER_PAGE;

    // console.log('start',start);
    // console.log('end',end);
    // console.log('results:')
    // console.log(state.search.results.slice(start,end))

    return state.search.results.slice(start,end);

}

