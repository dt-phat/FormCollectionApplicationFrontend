<template>
    <div id="app">
        <NavBar v-if="!isAuthPage" />
        <div :class="{ 'mt-20': !isAuthPage }">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
    name: "App",
    components: {
        NavBar,
    },
    computed: {
        isAuthPage() {
            return this.$route.path === '/login' || this.$route.path === '/register';
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
