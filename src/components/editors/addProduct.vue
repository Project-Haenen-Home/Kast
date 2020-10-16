<template>
    <div>
        <div id="title">Product toevoegen</div>
        <table>
            <tr>
                <td><label for="name">Naam: </label></td>
                <td><input id="name" type="text" v-model="name"/></td>
            </tr>
            <tr>
                <td><label for="category">Categorie: </label></td>
                <td>
                    <select id="category" v-model="category">
                        <option value="0" hidden>Kies een categorie...</option>
                        <option v-for="category in DBStore.categories" v-bind:key="category._id" v-bind:value="category._id">{{ category.name }}</option>
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
                    <input type="number" min="0" step="1" v-model="amount" style="max-width: 75px;"/>
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

            <tr><td></td><td><button @click="addProduct">Voeg toe</button></td></tr>
        </table>
    </div>
</template>

<script>
import DBStore from "../../stores/DBStore"

export default {
    name: "addProduct",
    data() {
        return {
            name: "",
            category: "0",
            deadline: "",
            amount: "0",
            unit: "0",
            comment: "",

            DBStore: DBStore.data
        }
    },
    methods: {
        addProduct: function() {
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
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(json)
                };


                fetch("http://wolleserver.local:2400/product", requestOptions)
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .then(() => {
                        DBStore.methods.getProducts();
                        this.$emit("close");
                    });
            } else alert("Sommige verplichten velden zijn niet ingevuld!");
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