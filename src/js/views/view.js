import icon from "../../img/icons.svg";

export default class View{
    _errorMessage;
    _parentElement;
    _data;
    _generateMarkup(){};
    render(data) {
        if(!data || (Array.isArray(data) && data.length===0)) return this.renderError()
        this._data = data;
        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }

    update(data){
        // if(!data || (Array.isArray(data) && data.length===0)) return this.renderError()
        this._data = data;
        const newMarkup = this._generateMarkup();
        const newDom = document.createRange().createContextualFragment(newMarkup);
        const newElement = Array.from(newDom.querySelectorAll('*'));
        const currElement = Array.from(this._parentElement.querySelectorAll('*'));
        // console.log(newMarkup)
        // console.log(newDom)
        // console.log( Array.from(newElement))

        newElement.forEach((newEl,i)=>{
            const currEl = currElement[i];

            //update text content
            if(!newEl.isEqualNode(currEl) && (newEl.firstChild?.nodeValue.trim() !== '')){
                currEl.textContent = newEl.textContent
            }

            // update attributes
            if(!newEl.isEqualNode(currEl)){
                // console.log('---------->',currEl)
                // console.log('---------->',newEl);
                console.log(!newEl.isEqualNode(currEl) && (newEl.firstChild?.nodeValue.trim() !== ''))
                Array.from(newEl.attributes).forEach(att=>{
                    currEl.setAttribute(att.name,att.value)
                })

            }
        })
        // const currMarkup = new Array.from(this._parentElement.querySelectorAll('*'))


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