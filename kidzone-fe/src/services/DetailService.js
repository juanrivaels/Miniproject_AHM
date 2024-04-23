import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/detailPenjualan';

export const createDetail = (detail) => axios.post(REST_API_BASE_URL + '/saveDetailPenjualan', detail);