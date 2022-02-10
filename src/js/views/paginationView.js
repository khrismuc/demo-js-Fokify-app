import View from "./view";
import { RES_PER_PAGE } from "../config";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");


  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const element = e.target.closest(".btn--inline");
      handler(element.dataset.goto);
    });
  }
  _generateMarkup() {
    // 1 page and there are others

    const numPages = Math.ceil(this._data.results.length / RES_PER_PAGE);
    const page = +this._data.page;


    if (page === 1 && numPages > 1) {
      return ` <button data-goto="${
        page + 1
      }" class="btn--inline pagination__btn--next">
                    <span>Page 2</span>
                    <svg class="search__icon">
                        <use href="src/img/icons.svg#icon-arrow-right"></use>
                    </svg>
                </button>`;
    }

    if (page > 1 && page < numPages) {

      return `

        <button data-goto="${
          page - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${page - 1}</span>
          </button>
          <button data-goto="${
            page + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${page + 1}</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </button>`;
    }

    if (page === numPages && numPages > 1) {

      return ` <button data-goto="${
        page - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${page - 1}</span>
          </button>`;
    }

    // return ``

    // no page 1 and no last page

    // last page

    // only 1 page
  }
}

export default new PaginationView();
