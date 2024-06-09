import axiosClient from "./axiosClient";

const userService = {
    login(data) {
        const url = "/auth/login";
        return axiosClient.post(url, data);
    },
    
    register(data) {
        const url = "/auth/register";
        return axiosClient.post(url, data);
    },
    
    getMe() {
        const url = "/auth/me";
        return axiosClient.get(url);
    },

    logout() {
        const url = "/auth/logout";
        return axiosClient.post(url);
    },

    updateProfile(data) {
        const url = "/auth/update";
        return axiosClient.put(url, data);
    },

    changePassword(data) {
        const url = "/auth/change-password";
        return axiosClient.put(url, data);
    },

    getOrders() {
        const url = "/orders";
        return axiosClient.get(url);
    },

    addOrder(data) {
        const url = "/orders";
        return axiosClient.post(url, data);
    }

};

export default userService;