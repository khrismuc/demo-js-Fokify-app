import View from "./view";

class ResultView extends View {
  _parentElement = document.querySelector(".results");

  _errorMessage = "Search not found";
  _message = "Success in search";

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join("");
  }
  _generateMarkupPreview(res) {
    const id = window.location.hash.slice(1);

    return ` <li class="preview">
            <a class="preview__link ${
              res.id === id ? "preview__link--active" : ""
            }" href="#${res.id}">
              <figure class="preview__fig">
                <img src="${res.imageUrl}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${res.title}</h4>
                <p class="preview__publisher">${res.publisher}</p>
<!--                <div class="preview__user-generated">-->
<!--                  <svg>-->
<!--                    <use href="src/img/icons.svg#icon-user"></use>-->
<!--                  </svg>-->
<!--                </div>-->
              </div>
            </a>
          </li>`;
  }
}

export default new ResultView();
