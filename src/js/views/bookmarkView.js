import View from "./view";
import PreviewView from "./previewView";

class BookmarkView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmark yet. Find a nice recipe and bookmark it ;)";

  _generateMarkup() {
    return this._data
      .map((result) => PreviewView.render(result, false))
      .join("");
  }
}

export default new BookmarkView();
