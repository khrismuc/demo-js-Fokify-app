import icon from "../../img/icons.svg";

export default class View{
    render(data) {
        this._data = data;
        if(!data || (Array.isArray(data) && data.length===0)) return this.renderError()
        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }
    addHandlerRender(handler) {
        ["load", "hashchange"].forEach((ev) =>
            window.addEventListener(ev, handler)
        );
    }
    renderError(message = this._errorMessage) {
        const markup = `<div class="error">
            <div>
              <svg>
                <use href="${icon}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }

    renderSpinner() {
        console.log('sppppppppppppppiner')
        const markup = `
        <div class="spinner">
          <svg>
            <use href="${icon}#icon-loader"></use>
          </svg>
        </div> `;
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }
    _clear() {
        this._parentElement.innerHTML = "";
    }
}