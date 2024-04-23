import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/penjualan';

export const listPenjualan = () => axios.get(REST_API_BASE_URL + '/getPenjualan');
export const createPenjualan = (penjualan) => axios.post(REST_API_BASE_URL + '/savePenjualan', penjualan);