<template>
    <div>
        <div id="title">Categorie toevoegen</div>
        <table>
            <tr><td><label for="name">Naam: </label></td> <td><input id="name" type="text" v-model="name"/></td></tr>
            <tr><td></td><td><button @click="addCategory">Voeg toe</button></td></tr>
        </table>
    </div>
</template>

<script>
import DBStore from "../../stores/DBStore"

export default {
    name: "addCategory",
    data() {
        return {
            name: "",

            DBStore: DBStore.data
        }
    },
    methods: {
        addCategory: function() {
            if(this.name != "") {
                var json = { name: this.name };

                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(json)
                };


                fetch("http://wolleserver.local:2400/category", requestOptions)
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .then(() => {
                        DBStore.methods.getCategories();
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