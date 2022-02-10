import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model.js";
import {MODAL_CLOSE_SEC} from "./config";
import recipeView from "./views/recipeView";
import searchView from "./views/searchView";
import resultView from "./views/resultView";
import paginationView from "./views/paginationView";
import bookmarkView from "./views/bookmarkView";
import addRecipeView from "./views/addRecipeView";
const recipeContainer = document.querySelector(".recipe");
const resultsContainer = document.querySelector(".results");

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;

    // render spinner
    recipeView.renderSpinner(recipeContainer);

    // update search
    resultView.update(model.getSearchResultsPerPage());

    // update bookmark
    console.log('controller----')
    console.log(model.state.bookmarks)
    // bookmarkView.render(model.state.bookmarks);
    bookmarkView.update(model.state.bookmarks)


    // loading recipe
    await model.loadRecipe(id);

    // rendering recipe

    recipeView.render(model.state.recipe);

  } catch (err) {
    recipeView.renderError(err.message);
    console.log(err.message)
    throw err
  }
};

const controlSearchResult = async function () {
  try {
    console.log("control search");
    // get query
    const query = searchView.getQuery();
    // if(!query) return;

    // render spinner
    resultView.renderSpinner(resultsContainer);

    // load search
    await model.loadSearchResults(query);

    // render result
    console.log(model.state);

    // resultView.render(model.state.search.results)
    resultView.render(model.getSearchResultsPerPage());

    // render pagination
    paginationView.render(model.state.search);
  } catch (err) {
    resultView.renderError(err.message);
    console.log(err.message)
    throw err

  }
};

const controlPagination = function (goto) {
  resultView.render(model.getSearchResultsPerPage(goto));
  paginationView.render(model.state.search);
};

const controlServing = function (updateTo = 1) {
  model.updateServing(updateTo);
  recipeView.update(model.state.recipe);
  // recipeView.render(model.state.recipe)
};

const controlAddBookmarked = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe);
  recipeView.update(model.state.recipe);
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmark = function(){
  bookmarkView.render(model.state.bookmarks);
}

const controlAddRecipe =  async function(data){
  try {
    console.log('-----before------')
    console.log(model.state.recipe)

    addRecipeView.renderSpinner()
    await model.addRecipe(data);
    recipeView.render(model.state.recipe)

    console.log('-----after------')

    console.log(model.state.recipe)

    addRecipeView.renderMessage()
    setTimeout(function(){
      addRecipeView.toggleWindow()
    },MODAL_CLOSE_SEC*1000)


  }catch (err){
    console.error(err.message)
    addRecipeView.renderError(err.message)
  }
}

const init = function () {
  recipeView.addHandlerRender(showRecipe);
  bookmarkView.addHandlerRender(controlBookmark)
  recipeView.addHandlerAddBookmark(controlAddBookmarked);
  recipeView.addHandlerUpdateServing(controlServing);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe)

};
init();

