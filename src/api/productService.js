import axiosClient from "./axiosClient";

const ProductService = {
    async getAll() {
        try {
            const response = await axiosClient.get("/products");
            return response;
        } catch (error) {
            throw error;
        }
    },

    async getProduct(id) {
        try {
            const response = await axiosClient.get(`/products/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    async createProduct(data) {
        try {
            const response = await axiosClient.post("/products", data);
            return response;
        } catch (error) {
            throw error;
        }
    },

    async updateProduct(data) {
        try {
            const response = await axiosClient.put(`/products/${data.id}`, data);
            return response;
        } catch (error) {
            throw error;
        }
    },

    async deleteProduct(id) {
        try {
            const response = await axiosClient.delete(`/products/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    async searchProduct(params) {
        try {
            const response = await axiosClient.get("/products", { params });
            return response;
        } catch (error) {
            throw error;
        }
    },

    async uploadImage(data) {
        try {
            const response = await axiosClient.post("/upload", data);
            return response;
        } catch (error) {
            throw error;
        }
    },
}

export default ProductService;