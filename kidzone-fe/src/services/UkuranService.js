import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/ukurans';

export const listUkurans = () => axios.get(REST_API_BASE_URL + '/getUkuranActive');

export const createUkuran = (ukuran) => axios.post(REST_API_BASE_URL + '/saveUkuran', ukuran);

export const updateUkuran = (ukuran) => axios.put(REST_API_BASE_URL + '/updateUkuran/', ukuran);

export const deleteUkuran = (ukuranId) => axios.post(REST_API_BASE_URL + '/deleteUkuran', { ukr_id: ukuranId });

export const getUkuranId = (ukuranId) => axios.get(REST_API_BASE_URL + '/getUkuranById/', { params: { ukr_id: ukuranId } });