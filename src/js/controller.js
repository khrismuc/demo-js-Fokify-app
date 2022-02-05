import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from './model.js'
import recipeView from './views/recipeView'
import searchView from "./views/searchView";
import resultView from "./views/resultView";

const recipeContainer = document.querySelector(".recipe");
const resultsContainer = document.querySelector('.results')

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id)

    if(!id) throw new Error('no page found')

    // render spinner
    recipeView.renderSpinner(recipeContainer);

    // loading recipe
      await model.loadRecipe(id)

    // rendering recipe

    recipeView.render(model.state.recipe)


  } catch (err) {
    recipeView.renderError(err.message)
  }
};


const controlSearchResult = async function(){
  try {
    console.log('control search')
    // get query
    const query = searchView.getQuery()
    // if(!query) return;

    // render spinner
    resultView.renderSpinner(resultsContainer)

    // load search
    await model.loadSearchResults(query);

    // render result
    console.log('------')
    console.log(model.state)
    resultView.render(model.state.search.results)


  }catch (err){
    recipeView.renderError(err.message)

  }

}
const init = function(){
  recipeView.addHandlerRender(showRecipe)
  searchView.addHandlerSearch(controlSearchResult)
}
init();

// const btn  = window.document.querySelector('.search__btn');
//
// btn.addEventListener('submit',function(e){
//   e.preventDefault()
//   console.log(e)
// })
//

