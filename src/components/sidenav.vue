<template>
    <div>
        <div class="filter">
            <div class="filter-head clickable" style="margin-top: 20px" @click="openAdder">Product toevoegen<addIcon class="logo"/></div>
        </div>
        <div class="filter">
            <div class="filter-head">Categorieën<settingsIcon class="logo clickable" @click="openOverlay" /></div>
            <div class="filter-content">
                <select id="category" v-model="DBStore.productFilter.categoryID" style="margin-top: 5px" @change="DBMethods.getProducts"><option selected value="0">Alle categorieën</option><option v-for="category in DBStore.categories" :key="category._id" :value="category._id">{{ category.name }}</option></select>
            </div>
        </div>
    </div>
</template>

<script>
import DBStore from "../stores/DBStore"

import addIcon from "../assets/add.svg"
import settingsIcon from "../assets/settings.svg"

export default {
    name: "sidenav",
    components: { addIcon, settingsIcon },
    data() {
        return {
            DBStore: DBStore.data,
            DBMethods: DBStore.methods
        }
    },
    methods: {
        openOverlay: function() {
            this.$root.$emit('openOverlay', '{"overlay": "categorySettings"}')
        },
        openAdder: function() {
            this.$root.$emit('openOverlay', '{"overlay": "addProduct"}');
        },
    }
}
</script>

<style scoped>
    .filter {
        margin-bottom: 20px;
    }

    .filter-head {
        font-size: 20px;
        font-weight: 700;
        font-family: 'Raleway', sans-serif;
        display: flex;
        align-items: center;
        margin-bottom: 5px;
    }

    .filter-content {
        margin-left: 10px;
    }

    .filter-item {
        margin: 5px 0;
    }

    .slider {
        width: 80px;
        margin-right: 10px;
    }

    .logo {
        width: 20px;
        height: 20px;

        margin-left: 10px;
    }
</style>