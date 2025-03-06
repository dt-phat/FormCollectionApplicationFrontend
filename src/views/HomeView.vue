<template>
    <div class="min-h-screen p-6">

        <!-- Search Bar -->
        <div class="mb-6 flex justify-center gap-4">
            <input v-model="searchQuery" type="text" placeholder="Tìm kiếm form..."
                class="w-full max-w-md p-3 border border-gray-300 rounded-lg outline-none text-lg shadow-sm focus:ring-2 focus:ring-blue-400">
            <button @click="searchForms"
                class="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700">
                Tìm kiếm
            </button>
        </div>

        <!-- Project List -->
        <section class="mt-8">
            <h3 class="text-lg font-semibold text-gray-700 mb-4">Recent Forms</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div v-for="(project, index) in filteredProjects" :key="index"
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
            searchQuery: "",
            projects: [
                { name: "Survey Form", date: "Feb 25, 2025" },
                { name: "Feedback Form", date: "Feb 20, 2025" },
                { name: "Registration Form", date: "Feb 15, 2025" },
                { name: "Customer Satisfaction", date: "Jan 30, 2025" },
                { name: "Employee Feedback", date: "Jan 20, 2025" }
            ]
        };
    },
    computed: {
        filteredProjects() {
            return this.projects.filter(project =>
                project.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }
    },
    methods: {
        createProject() {
            alert("Creating a new form...");
        },
        openProject(project) {
            alert(`Opening ${project.name}`);
        },
        searchForms() {
            console.log("Searching for:", this.searchQuery);
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
