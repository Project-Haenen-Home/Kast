<template>
    <div>
        <div id="title">Categorie wijzigen</div>
        <table>
            <tr><td><label for="name">Naam: </label></td> <td><input id="name" type="text" v-model="name"/></td></tr>
            <tr><td></td><td><button @click="editCategory">Wijzig</button></td></tr>
        </table>
    </div>
</template>

<script>
import DBStore from "../../stores/DBStore"

export default {
    name: "addCategory",
    props: ['categoryID'],
    data() {
        return {
            categoryName: "",
            curID: "",

            DBStore: DBStore.data
        }
    },
    computed: {
        name: {
            get: function() {
                if(this.curID != this.categoryID) this.getCategory();
                return this.categoryName;
            },
            set: function(value) { this.categoryName = value }
        }
    },
    methods: {
        editCategory: function() {
            if(this.name != "") {
                var json = { name: this.name };

                const requestOptions = {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(json)
                };


                fetch("http://wolleserver.local:2400/category/" + this.categoryID, requestOptions)
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .then(() => {
                        DBStore.methods.getCategories();
                        this.$emit("close");
                    });
            } else alert("Sommige verplichten velden zijn niet ingevuld!");
        },
        idToName: function(id, arr) {
            for (let el of arr) {
                if (el._id === id) {
                    return el.name;
                }
            }
        },
        getCategory: function() {
            this.name = this.idToName(this.categoryID, this.DBStore.categories);
            this.curID = this.categoryID;
        }
    }
}
</script>

<style scoped>
    #title {
        font-size: 20px;
        font-weight: 700;
        font-family: 'Raleway', sans-serif;
        margin-bottom: 7px;
    }

    td {
        vertical-align: top;
    }

    button {
        float: right;
        margin: 10px 5% 5px 0;
    }

    textarea {
        resize: none;
    }
</style>