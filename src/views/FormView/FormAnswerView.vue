<template>
    <div class="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl mt-10 border border-gray-200">
        <div class="flex">
            <h1 class="text-4xl font-bold text-purple-700 mb-6">Kết Quả Form:</h1>
            <button @click="exportToExcel"
                class="ml-auto h-10 px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded-lg shadow">
                <i class="fa-solid fa-file-excel mr-2"></i> Xuất File Excel
            </button>
        </div>

        <div class="mb-4">
            <label class="text-lg font-medium">Chế độ xem:</label>
            <select v-model="viewMode" class="ml-2 p-2 border rounded">
                <option value="question">Theo Câu Hỏi</option>
                <option value="response">Theo Form Trả Lời</option>
                <option value="table">Dạng Bảng (Excel)</option>
            </select>
        </div>

        <div v-if="rowData.length > 0">
            <!-- Chế độ xem theo câu hỏi -->
            <div v-if="viewMode === 'question'">
                <div v-for="(answers, question) in questionView" :key="question" class="mb-4">
                    <h3 class="text-lg font-medium text-purple-900">{{ question }}</h3>
                    <div class="p-4 border bg-gray-100 rounded-lg mt-2">
                        <div v-for="(response, i) in answers" :key="i" class="p-2 bg-white shadow-sm rounded-md mb-2">
                            <strong class="text-purple-800">{{ response.name }}:</strong>
                            <span class="text-gray-700">{{ response.answer || 'Chưa trả lời' }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Chế độ xem theo form trả lời -->
            <div v-else-if="viewMode === 'response'">
                <div v-for="(entry, index) in responseView" :key="index" class="mb-6 p-4 border bg-gray-100 rounded-lg">
                    <h3 class="text-lg font-medium text-purple-900">Người dùng: {{ entry.user }}</h3>
                    <div v-for="(answer, question) in entry.answers" :key="question"
                        class="p-2 bg-white shadow-sm rounded-md mt-2">
                        <strong class="text-purple-800">{{ question }}:</strong>
                        <span class="text-gray-700">{{ answer || 'Chưa trả lời' }}</span>
                    </div>
                </div>
            </div>

            <!-- Chế độ xem dạng bảng (Excel) -->
            <div v-else-if="viewMode === 'table'" class="overflow-x-auto">
                <table class="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr class="bg-purple-200 text-purple-800">
                            <th class="border border-gray-300 px-4 py-2">Người dùng</th>
                            <th v-for="(header, index) in tableHeaders" :key="index"
                                class="border border-gray-300 px-4 py-2">
                                {{ header }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, index) in tableData" :key="index" class="text-center">
                            <td class="border border-gray-300 px-4 py-2 font-medium">{{ row.user }}</td>
                            <td v-for="(value, idx) in row.answers" :key="idx" class="border border-gray-300 px-4 py-2">
                                {{ value || 'Chưa trả lời' }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div v-else class="h-20 bg-red-100 flex justify-center items-center rounded-md">
            <p>Chưa nhận bất cứ phản hồi nào!</p>
        </div>
    </div>
</template>

<script>
import * as XLSX from "xlsx";
import { getFormSummary } from "../../api/formApi";

export default {
    props: {
        formId: String,
    },
    data() {
        return {
            formName: "",
            rowData: [],
            viewMode: "question",
        };
    },
    async created() {
        try {
            const response = await getFormSummary("projectId", this.formId);
            const result = response?.result;
            console.log(result);
            if (result) {
                this.formName = result.form?.name || "Form Không Tên";
                this.rowData = result.rowData || [];
            } else {
                console.error("Lỗi: Không có dữ liệu trong response.result");
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu form:", error);
        }
    },
    computed: {
        questionView() {
            const grouped = {};
            if (!Array.isArray(this.rowData)) return grouped;

            this.rowData.forEach(entry => {
                Object.keys(entry).forEach(question => {
                    if (question !== "User name") {
                        if (!grouped[question]) grouped[question] = [];
                        grouped[question].push({
                            name: entry["User name"],
                            answer: entry[question]
                        });
                    }
                });
            });
            return grouped;
        },
        responseView() {
            if (!Array.isArray(this.rowData)) return [];
            return this.rowData.map(entry => ({
                user: entry["User name"],
                answers: Object.fromEntries(
                    Object.entries(entry).filter(([key]) => key !== "User name")
                )
            }));
        },
        tableHeaders() {
            if (!this.rowData.length) return [];
            const headers = new Set();
            this.rowData.forEach(entry => {
                Object.keys(entry).forEach(key => {
                    if (key !== "User name") headers.add(key);
                });
            });
            return Array.from(headers);
        },
        tableData() {
            return this.rowData.map(entry => ({
                user: entry["User name"],
                answers: this.tableHeaders.map(header => entry[header] || "")
            }));
        }
    },
    methods: {
        exportToExcel() {
            const headers = ["Người Dùng", ...this.tableHeaders];
            const data = this.rowData.map(entry => [
                entry["User name"],
                ...this.tableHeaders.map(header => entry[header] || "Chưa trả lời")
            ]);
            const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Form Kết Quả");
            XLSX.writeFile(workbook, `${this.formName}_Ket_Qua.xlsx`);
        }
    }
};
</script>

<style>
table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
}

th {
    background-color: #f4f4f4;
}
</style>
