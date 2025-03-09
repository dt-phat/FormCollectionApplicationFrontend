<template>
    <div id="app">
        <NavBar v-if="hasNavBar" class="mb-2 fixed" />
        <div :class="{ 'mt-20': hasNavBar }">
            <router-view></router-view>
        </div>
        <Footer />
    </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';

export default {
    name: "App",
    data() {
        return {
            hasNavBarPage: [
                "/",
                "/project",
                "/project/:projectId"
            ],
            projectRoutePattern: /^\/project\/[^/]+$/
        };
    },
    components: {
        NavBar,
        Footer,
    },
    computed: {
        hasNavBar() {
            return this.hasNavBarPage.includes(this.$route.path) ||
                this.projectRoutePattern.test(this.$route.path);
        }
    }
};
</script>

<style>
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
}

* {
    box-sizing: border-box;
}
</style>
