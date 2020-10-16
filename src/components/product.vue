<template>
    <div class="product">
            <div class="header">
                <div class="title-bay">
                    <span style="display: flex">
                        <span class="title">{{ product.name }}</span>
                    </span>
                    <span class="logo-bay">
                        <settingsIcon class="logo clickable" @click="openEditor(product._id)"/>
                    </span>
                </div>
                <div class="under-title">
                    <span>{{ idToName(product.categoryID, DBStore.categories) }}</span>
                    <span v-if="product.amount != null && product.amount != ''">
                        <span>&nbsp;-&nbsp;</span>
                        <span>{{ product.amount }}</span>
                        <span v-if="product.unit != null && product.unit != ''">&nbsp;{{ product.unit }}</span>
                    </span>
                    <span v-if="(product.comment != null && product.comment != '')">
                        <span>&nbsp;-&nbsp;</span>
                        <span> Notitie... 
                            <span class="clickable" @click="showComment = true" v-if="!showComment">(+)</span>
                            <span class="clickable" @click="showComment = false" v-if="showComment">(-)</span>
                        </span>
                    </span>
                </div>
            </div>
            <div class="comment" v-if="showComment">{{ product.comment }}</div>
            <div class="comment" v-if="product.deadline != null">{{ formatDate(product.deadline) }}</div>
    </div>
</template>

<script>
import DBStore from "../stores/DBStore"
import settingsIcon from "../assets/settings.svg"

export default {
    name: "product",
    components: { settingsIcon },
    props: ['product'],
    data() {
        return {
            showComment: false,

            DBStore: DBStore.data
        }
    },
    methods: {
        formatDate: function(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString("nl-NL", { weekday: "short", year: "numeric", month: 'long', day: 'numeric' });
        },
        idToName: function(id, arr) {
            for (let el of arr) {
                if (el._id === id) {
                    return el.name;
                }
            }
        },
        finishproduct(id) {
            // if(confirm("Heb je deze taak gedaan?")) {
            //     const requestOptions = {
            //         method: "PATCH",
            //         headers: { "Content-Type": "application/json" },
            //         body: JSON.stringify({ finished: true })
            //     };


            //     fetch("http://wolleserver.local:2400/product/" + id, requestOptions)
            //         .then(response => response.json())
            //         .then(data => console.log(data))
            //         .then(() => DBStore.methods.getproducts());
            // }
        },
        openEditor: function(id) {
            this.$root.$emit('openOverlay', '{ "overlay": "editProduct", "id": "' + id + '" }');
        }
    }
}
</script>

<style scoped>
    .product {
        border: 2px solid;
        border-radius: 5px;
        padding: 15px;
        margin: 10px 0;
    }

    .header {
        padding-bottom: 10px;
    }

    .title-bay {
        position: relative;
    }

    .title {
        display: flex;
        justify-content: flex-start;
        font-size: 24px;
        font-weight: bold;
        font-family: 'Raleway', sans-serif;
        max-width: calc(100% - 80px);
        /* max-width: calc(100% - 80px); */
    }

    .logo-bay {
        position: absolute;
        top: 0;
        right: 10px
    }

    .under-title {
        font-size: 12px;
        color:darkslategray;
        font-style: italic;
        margin: 2.5px 0 0 5px;
    }

    .grid-container {
        display: grid;
        gap: 12px;
    }

    .logo {
        width: 24px;
        height: 24px;
    }

    .clickable {
        cursor: pointer;
    }

    .deadline-txt {
        margin-left: 10px;
    }

    .comment {
        margin-bottom: 10px;
    }

    .finishItem {
        grid-column: 2;
        grid-row: 1 / span 3;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-right: 20px;
    }

    .finishButton {
        border: 2px solid;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: linen;
        width: 90%;
        height: 90%;
        min-width: 80px;
        max-width: 150px;
    }
</style>