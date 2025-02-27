<template>
    <div class="min-h-screen p-6">
        <div class="flex justify-center gap-10">
            <router-link to="/project"
                class="flex w-50 justify-center items-center bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700">
                <i class="fa-solid fa-diagram-project mr-2"></i> Dự Án Của Tôi
            </router-link>
            <router-link
                class="flex w-50 justify-center items-center bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-700"
                @click="createProject">
                <i class="fas fa-plus mr-2"></i> Dự Án Mới
            </router-link>
        </div>

        <!-- Project List -->
        <section class="mt-8">
            <h3 class="text-lg font-semibold text-gray-700 mb-4">Recent Forms</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div v-for="(project, index) in projects" :key="index"
                    class="bg-white p-4 rounded-lg shadow hover:shadow-lg cursor-pointer transition"
                    @click="openProject(project)">
                    <h4 class="text-lg font-semibold text-gray-800">{{ project.name }}</h4>
                    <p class="text-gray-600 text-sm">{{ project.date }}</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            projects: [
                { name: "Survey Form", date: "Feb 25, 2025" },
                { name: "Feedback Form", date: "Feb 20, 2025" },
                { name: "Registration Form", date: "Feb 15, 2025" }
            ]
        };
    },
    methods: {
        createProject() {
            alert("Creating a new form...");
        },
        openProject(project) {
            alert(`Opening ${project.name}`);
        }
    }
};
</script>

<style scoped>
button {
    transition: transform 0.2s ease-in-out;
}

button:hover {
    transform: scale(1.05);
}
</style>