const DBStore = {
    data: {
        products: [],
        categories: [],

        units: ["gram", "kilo", "stukken"],

        productFilter: { categoryID: "0" }
    },
    methods: {
        getAll() {
            DBStore.methods.getProducts();
            DBStore.methods.getCategories();
        },

        getProducts() {
            var query = "?";
            if(DBStore.data.productFilter != null) {
                var qArr = [];
                if(DBStore.data.productFilter.categoryID != null && DBStore.data.productFilter.categoryID != "0") qArr.push("categoryID=" + DBStore.data.productFilter.categoryID);
                query += qArr.join("&");
            }

            fetch("http://wolleserver.local:2400/product" + query)
                .then(resp => resp.json())
                .then(data => {
                    DBStore.data.products = data;
                });
        },

        getCategories() {
            fetch("http://wolleserver.local:2400/category")
                .then(resp => resp.json())
                .then(data => {
                    DBStore.data.categories = data;
                });
        },
    }
};

export default DBStore;