var app = new Vue({
    el: '#app',
    data: {
        books: [],
        MySearch: ''
    },
    methods: {

    },
    computed: {
        filteredBooks: function () {
            return this.books.filter((book) => {
                return book.title.match(this.MySearch);
            })
        }
    },
    mounted: function () {
        var self = this;
        self.$http.get('dataServer.json').then(function (response) {
            //console.log(response);
            self.books = response.data;
        });
    }
});