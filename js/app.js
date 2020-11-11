var app = new Vue({
    el: '#app',
    data: {
        books: [],
        MySearch: '',
        pagination: {
            maxPage: 4,
            current: 1,
            totalItems: 0,
            totalPages: 5,
            listPagination: []
        }
    },
    methods: {
        previous: function (e) {
            e.preventDefault();
            console.log('maxPage: ' + this.pagination.maxPage);
            console.log('current page: ' + this.pagination.current);
            console.log('totalItems: ' + this.pagination.totalItems);
            console.log('totalPages: ' + this.pagination.totalPages);
            console.log('listPagination: ' + this.pagination.listPagination);

            if (this.pagination.current === 1) {
                return false;
            }

            this.pagination.current--;

            this.books = this.pagination.listPagination[this.pagination.current - 1];
        },
        next: function (e) {
            e.preventDefault();
            console.log('maxPage: ' + this.pagination.maxPage);
            console.log('current page: ' + this.pagination.current);
            console.log('totalItems: ' + this.pagination.totalItems);
            console.log('totalPages: ' + this.pagination.totalPages);
            console.log('listPagination: ' + this.pagination.listPagination);

            if (this.pagination.current === this.pagination.totalPages) {
                return false;
            }

            this.pagination.current++;

            this.books = this.pagination.listPagination[this.pagination.current - 1];
        },
        pagePagination: function (e, id) {
            e.preventDefault();
            console.log('maxPage: ' + this.pagination.maxPage);
            console.log('current page: ' + this.pagination.current);
            console.log('totalItems: ' + this.pagination.totalItems);
            console.log('totalPages: ' + this.pagination.totalPages);
            console.log('listPagination: ' + this.pagination.listPagination);

            this.pagination.current = id + 1;
            this.books = this.pagination.listPagination[id];
        }
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
            self.pagination.totalItems = response.data.length;
            self.pagination.totalPages = Math.ceil(response.data.length / self.pagination.maxPage);

            var aux = [];

            for (var k in response.data) {
                aux.push(response.data[k]);
                if (aux.length === self.pagination.maxPage) {
                    self.pagination.listPagination.push(aux);
                    aux = [];
                }
            }

            if (aux.length > 0) {
                self.pagination.listPagination.push(aux);
            }

            //console.log(self.pagination.listPagination);

            self.books = self.pagination.listPagination[0];
        });
    }
});