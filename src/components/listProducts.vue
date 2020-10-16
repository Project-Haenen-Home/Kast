<template>
    <div>
        <div id="productContainer">
            <product v-for="product in DBStore.products" :key="product._id" :product="product" />
        </div>
    </div>
</template>

<script>
import DBStore from "../stores/DBStore"
import product from "./product.vue"

export default {
    name: "products",
    components: { product },
    data() {
        return {
            DBStore: DBStore.data
        }
    }
};
</script>

<style scoped>
    #productContainer {
        margin: 0 10px 0 10px;
    }

    @media only screen and (min-width: 600px) {
        #productContainer {
            margin: 0 20px 0 20px;
            display: grid;
            gap: 0 15px;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        }
    }
</style>