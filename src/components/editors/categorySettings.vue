<template>
    <div id="categorySettings">
        <div id="header">
            <div id="title">Categorie instellingen</div>
            <addIcon class="logo clickable" @click="openAdd"/>
        </div>
        <div id="categories">
            <div v-for="category in DBStore.categories" :key="category._id" class="category">
                <div>{{ category.name }}</div>
                <editIcon class="logo clickable" style="margin-right: 5px" @click="openEdit(category._id)" />
            </div>
        </div>
    </div>
</template>

<script>
import DBStore from "../../stores/DBStore"
import addIcon from "../../assets/add.svg"
import editIcon from "../../assets/pen.svg"

export default {
    name: "categorySettings",
    components: { addIcon, editIcon },
    data() {
        return {
            DBStore: DBStore.data
        }
    },
    methods: {
        openAdd: function() {
            this.$root.$emit('openOverlay', '{ "overlay": "addCategory" }');
        },
        openEdit: function(id) {
            this.$root.$emit('openOverlay', '{ "overlay": "editCategory", "id": "' + id + '" }');
        },
    }
}
</script>

<style>
    #categorySettings {
        margin: 0 20px;
    }

    #header {
        display: flex;
    }

    #title {
        font-size: 20px;
        font-weight: 700;
        font-family: 'Raleway', sans-serif;
        margin-bottom: 7px;
    }

    #categories {
        padding: 10px;
    }

    .category {
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .logo {
        width: 24px;
        height: 24px;
        margin-left: 10px;
    }
</style>