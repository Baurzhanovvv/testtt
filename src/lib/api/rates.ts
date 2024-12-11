import axios from "axios";

export const getRates = async (pairId: number, startDate: string, endDate: string) => {
    const response = await axios.get(`http://localhost:3001/api/rates`, {
        params: { pairId, startDate, endDate },
    });
    return response.data;
};
