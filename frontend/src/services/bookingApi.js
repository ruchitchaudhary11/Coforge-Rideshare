import api from "./api";

export const createBooking = async (bookingData) => {
    const response = await api.post("/api/bookings", bookingData);
    return response.data;
};

export const getBookingsByPassenger = async (passengerId) => {
    const response = await api.get(
        `/api/bookings/passenger/${passengerId}`
    );

    return response.data;
};