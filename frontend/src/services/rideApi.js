import api from "./api";

export const createRide = async (rideData) => {
    const response = await api.post("/api/rides", rideData);
    return response.data;
};

export const getAllRides = async () => {
    const response = await api.get("/api/rides");
    return response.data;
};

export const getRideById = async (id) => {
    const response = await api.get(`/api/rides/${id}`);
    return response.data;
};

export const bookSeat = async (id) => {
    const response = await api.put(`/api/rides/${id}/book`);
    return response.data;
};

// NEW
export const getRidesByDriver = async (driverId) => {
    const response = await api.get(
        `/api/rides/driver/${driverId}`
    );

    return response.data;
};
export const deleteRide = async (id) => {
    const response = await api.delete(
        `/api/rides/${id}`
    );

    return response.data;

};
export const updateRide = async (id, rideData) => {
    const response = await api.put(
        `/api/rides/${id}`,
        rideData
    );

    return response.data;

};
