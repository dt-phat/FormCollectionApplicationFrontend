<template>
    <div id="app">
        <NavBar />
        <div class="mt-20">
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