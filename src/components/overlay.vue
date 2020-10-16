<template>
    <div>
        <div id="overlay" @click="closeOverlay"></div>
        <div id="content">
            <closeIcon class="logo clickable" @click="closeOverlay" />
            <productAdder id="productAdder" v-if="current == 'addProduct'" @close="closeOverlay" />
            <productEditor id="productEditor" v-if="current == 'editProduct'" @close="closeOverlay" :productID="contentID" />
            <categoryAdder id="categoryAdder" v-if="current == 'addCategory'" @close="closeOverlay" />
            <categoryEditor id="categoryEditor" v-if="current == 'editCategory'" @close="closeOverlay" :categoryID="contentID" />
            <categorySettings id="categorySettings" v-if="current == 'categorySettings'" @close="closeOverlay" />
        </div>
    </div>
</template>

<script>
import closeIcon from "../assets/close.svg"
import productAdder from "./editors/addProduct.vue"
import productEditor from "./editors/editProduct.vue"
import categoryAdder from "./editors/addCategory.vue"
import categoryEditor from "./editors/editCategory.vue"
import categorySettings from "./editors/categorySettings.vue"

export default {
    name: "overlay",
    components: { productAdder, productEditor, categoryAdder, categoryEditor, categorySettings, closeIcon },
    props: ['current', 'contentID'],
    data() {
        return {
            showCategoryAdd: false,
            showCategoryEdit: false,
            showCategorySet: false,

            showProductAdd: false,
            showProductEdit: false,
        }
    },
    methods: {
        closeOverlay: function() {
            this.$root.$emit('openOverlay', '{ "overlay": "", "id": ""}');
        }  
    }
}
</script>

<style scoped>
    #overlay {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.5);
        z-index: 5;
        cursor: pointer;
    }

    #content {
        position: absolute;
        background-color: white;
        top: 50%;
        left: 50%;
        width: 90%;
        max-width: 500px;
        padding: 30px 50px;
        transform: translate(-50%,-50%);
        -ms-transform: translate(-50%,-50%);
        padding: 30px 50px;
        border-radius: 10px;
        cursor: default;
        z-index: 6;
    }

    @media only screen and (min-width: 900px) {
        #content {
            width: 50%;
            height: auto;
        }
    }

     .logo {
        position: fixed;
        width: 24px;
        height: 24px;
        right: 20px;
        top: 20px;
    }

    .clickable {
        cursor: pointer;
    }
</style>