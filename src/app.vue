<template>
    <div>
        <overlay id="overlay" v-if="showOverlay" :current="currentOverlay" :contentID="overlayID"  />
        <titleBar />
        <div id="content">
            <products id="main-content" />
            <sidenav id="side-nav" />
        </div>
    </div>
</template>

<script>
import DBStore from "./stores/DBStore"
import titleBar from "./components/titleBar.vue"
import products from "./components/listProducts.vue"
import sidenav from "./components/sidenav.vue"

const overlay = () => import("./components/overlay.vue")

export default {
    name: "App",
    components: { overlay, titleBar, products, sidenav,  },
    data() {
        return {
            showOverlay: false,
            currentOverlay: "",
            overlayID: "",
        }
    },
    created() {
        DBStore.methods.getAll();
    },
    mounted() {
        this.$root.$on('openOverlay', (data) => {
            const j = JSON.parse(data);

            if(j.overlay != "") this.showOverlay = true;
            else this.showOverlay = false;

            this.overlayID = j.id;
            this.currentOverlay = j.overlay;
        })
    }
};
</script>

<style>
    * {
        box-sizing: border-box;
        font-family: 'Montserrat', sans-serif;
    }  

    body {
        margin: 0;
    }

    #content {
        display: flex;
        width: 100%;
        height: calc(100vh - 90px);
    }

    #main-content {
        height: inherit;
        width: 100%;
        overflow-y: scroll;
    }

    #side-nav {
        display: none;
    }

    @media only screen and (min-width: 1025px) {
        #side-nav {
            display: block;
            padding-left: 20px;
            border-left: 1px solid grey;
            min-width: 275px;
        }
    }

    .clickable {
        cursor: pointer;
    }

     /* scrollbar */
    ::-webkit-scrollbar {
        width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #f1f1f1; 
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #888; 
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555; 
    }
</style>