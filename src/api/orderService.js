import axiosClient from "./axiosClient";

const orderService = {
    getOrders() {
        const url = "/orders";
        return axiosClient.get(url);
    },

    getOrder(id) {
        const url = `/orders/${id}`;
        return axiosClient.get(url);
    },

    createOrder(data) {
        const url = "/orders";
        return axiosClient.post(url, data);
    },

    updateOrder(data) {
        const url = `/orders/${data.id}`;
        return axiosClient.put(url, data);
    },

    deleteOrder(id) {
        const url = `/orders/${id}`;
        return axiosClient.delete(url);
    },

    searchOrder(params) {
        const url = "/orders";
        return axiosClient.get(url, { params });
    },
};

export default orderService;