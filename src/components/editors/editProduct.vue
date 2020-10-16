<template>
    <div>
        <div style="position: relative">
            <div id="title">Product wijzigen</div>
            <deleteIcon class="logo clickable" style="margin-right: 5px" @click="deleteProduct(productID)" />
        </div>
        <table>
            <tr>
                <td><label for="name">Naam: </label></td>
                <td><input id="name" type="text" v-model="name"/></td>
            </tr>
            <tr>
                <td><label for="category">Categorie: </label></td>
                <td>
                    <select id="category" v-model="category">
                        <option v-for="category in DBStore.categories" :key="category._id" :value="category._id">{{ category.name }}</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td><label for="deadline">Houdbaardatum: </label></td>
                <td><input type="date" id="deadline" v-model="deadline"/></td>
            </tr>
            <tr>
                <td><label for="amount">Hoeveelheid: </label></td> 
                <td>
                    <input id="amount" type="number" min="0" step="1" v-model="amount" style="max-width: 75px;"/>
                    <select id="unit" v-model="unit">
                        <option value="0" hidden>Kies een eenheid...</option>
                        <option v-for="unit in DBStore.units" :key="unit" :value="unit">{{ unit }}</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td><label for="comment">Notitie: </label></td>
                <td><textarea id="comment" v-model="comment" rows="4" ></textarea></td>
            </tr>

            <tr><td></td><td><button @click="editProduct">Wijzig</button></td></tr>
        </table>
    </div>
</template>

<script>
import DBStore from "../../stores/DBStore"

import deleteIcon from "../../assets/delete.svg"

export default {
    name: "editProduct",
    props: ['productID'],
    components: { deleteIcon },
    data() {
        return {
            curID: "",
            product: null,

            DBStore: DBStore.data
        }
    },
    computed: {
        name: {
            get: function() {
                if(this.curID != this.productID) this.getProduct();
                return this.product.name;
            },
            set: function(value) { this.product.name = value }
        },
        category: {
            get: function() {
                if(this.curID != this.productID) this.getProduct();
                return this.product.categoryID;
            },
            set: function(value) { this.product.categoryID = value }
        },
        deadline: {
            get: function() {
                if(this.curID != this.productID) this.getProduct();
                return this.product.deadline;
            },
            set: function(value) { this.product.deadline = value }
        },
        amount: {
            get: function() {
                if(this.curID != this.productID) this.getProduct();
                return this.product.amount;
            },
            set: function(value) { this.product.amount = value }
        },
        unit: {
            get: function() {
                if(this.curID != this.productID) this.getProduct();
                return this.product.unit;
            },
            set: function(value) { this.product.unit = value }
        },
        comment: {
            get: function() {
                if(this.curID != this.productID) this.getProduct();
                return this.product.comment;
            },
            set: function(value) { this.product.comment = value }
        }
    },
    methods: {
        getProduct: function() {
            for(var i = 0; i < DBStore.data.products.length; i++) {
                if(DBStore.data.products[i]._id == this.productID) {
                    this.curID = this.productID;
                    this.product = {...DBStore.data.products[i]};
                    break;
                }
            }
        },
        editProduct: function() {
            if(this.name != "" && this.category != "0") {

                var json = new Object();
                json.name = this.name;
                json.categoryID = this.category;
                
                json.amount = this.amount;
                
                //if(this.deadline != "") json.deadline = this.deadline;
                if(this.unit != "0") json.unit = this.unit;
                if(this.comment != "") json.comment = this.comment;

                console.log(json);

                const requestOptions = {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(json)
                };


                fetch("http://wolleserver.local:2400/product/" + this.productID, requestOptions)
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .then(() => {
                        DBStore.methods.getProducts();
                        this.$emit("close");
                    });
            } else alert("Sommige verplichten velden zijn niet ingevuld!");
        },
        deleteProduct: function(id) {
            if(confirm("Weet je zeker dat je deze taak wilt verwijderen?")) {
                fetch("http://wolleserver.local:2400/product/" + id, { method: "DELETE" })
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .then(() => {
                        DBStore.methods.getProducts();
                        this.$emit("close");
                    });
            }
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

    .logo {
        position: absolute;
        top: 0;
        right: 30px;
    }
</style>