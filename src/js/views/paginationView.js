import View from "./view";
import { RES_PER_PAGE } from "../config";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
      console.log('-----------------')
    console.log("this data--->", this._data);
    this._parentElement.addEventListener("click", function (e) {
      const element = e.target.closest(".btn--inline");
      console.log(element);
      console.log(element.dataset.goto);

      handler(element.dataset.goto);
    });
  }
  _generateMarkup() {
    // 1 page and there are others
    console.log("markup pagination");

    const numPages = Math.ceil(this._data.results.length / RES_PER_PAGE);
    const page = +this._data.page;

    console.log(this._data.results.length);
    console.log(page, numPages);

    if (page === 1 && numPages > 1) {
      console.log("1 and others");
      return ` <button data-goto="${page+1}" class="btn--inline pagination__btn--next">
                    <span>Page 2</span>
                    <svg class="search__icon">
                        <use href="src/img/icons.svg#icon-arrow-right"></use>
                    </svg>
                </button>`;
    }

    if (page > 1 && page < numPages) {
      console.log(" others");

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
      console.log(" last");

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
