import View from "./view";
import PreviewView from "./previewView";

class ResultView extends View {
  _parentElement = document.querySelector(".results");

  _errorMessage = "Search not found";
  _message = "Success in search";

  _generateMarkup() {
    return this._data
      .map((result) => PreviewView.render(result, false))
      .join("");
  }
}

export default new ResultView();
