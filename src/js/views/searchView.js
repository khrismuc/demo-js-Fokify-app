
class SearchView {
    #parentElement = document.querySelector('.search');

    getQuery(){

        const query = document.querySelector('.search__field').value;
        this.#cleanInput();
        return query
    }

    addHandlerSearch(handler){
        document.querySelector('.search').addEventListener('submit',function(e){
            e.preventDefault()
            handler()
        })
    }



    #cleanInput(){
        document.querySelector('.search__field').value = '';
    }
}
export default new SearchView()