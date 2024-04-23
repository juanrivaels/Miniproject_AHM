import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/produks';

export const listProduks = () => axios.get(REST_API_BASE_URL + '/getProdukActive');

export const createProduk = (produk) => axios.post(REST_API_BASE_URL + '/saveProduk', produk);

export const updateProduk = (produk) => axios.post(REST_API_BASE_URL + '/updateProduk', produk);

export const deleteProduk = (produkId) => axios.post(REST_API_BASE_URL + '/deleteProduk', { pro_id: produkId });