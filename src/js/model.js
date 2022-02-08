import { API_URL } from "./config";
import { getJSON } from "./helpers.js";
import { RES_PER_PAGE } from "./config";

export { API_URL } from "./config.js";

console.log('model.js run')
export const state = {
  recipe: {},
  search: { query: '', results: [], page: 1, resultPerPage: RES_PER_PAGE },
  bookmarks:[]
};

export const loadSearchResults = async function (query) {
  try {
    state.search.page = 1;
    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);

    const {recipes} = data.data;
    state.search.results = recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        imageUrl: rec["image_url"],
      };
    });
  }
  catch (err){
    console.error('err--->'+err.message)
    throw err.message
  }
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
      imageUrl: recipe["image_url"],
      servings: recipe.servings,
      cookingTime: recipe["cooking_time"],
      ingredients: recipe.ingredients,
    };
    state.recipe.bookmarked = state.bookmarks.some(bookmark => bookmark.id === recipe.id);

  } catch (err) {
    console.log(err.message)
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
export const persistBookmark = function(){
  localStorage.setItem('bookmarks',JSON.stringify(state.bookmarks));
}
export const addBookmark = function(recipe){
  console.log('add')
  state.bookmarks.push(recipe)

  state.recipe.bookmarked =  true;
  persistBookmark();
}

export  const deleteBookmark =function(recipe){
  console.log('delete')

  const indx = state.bookmarks.findIndex(bookmark=>bookmark.id===recipe.id);
  state.bookmarks.splice(indx,1);
  state.recipe.bookmarked = false;
  persistBookmark();
}

export const init = function(){

  state.bookmarks.push(...JSON.parse(localStorage.getItem('bookmarks')))

}

init();





