import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ContentBody from "./Component/templates/ContentBody";
import Header from "./Component/templates/HeaderComponent";
import Menu from "./Component/templates/Menu";

import Beranda from "./Component/Page/Dashboard/Index";

import IndexTransaksi from "./Component/Page/Transaksi/index";
import AddTransaksi from "./Component/Page/Transaksi/add";


import MasterProduk from "./Component/Page/MasterProduk/Root"; 
import MasterProdukAdd from "./Component/Page/MasterProduk/add"; 
import MasterProdukIndex from "./Component/Page/MasterProduk/index"; 
import MasterProdukUpdate from "./Component/Page/MasterProduk/update";

import MasterUkuranAdd from "./Component/Page/MasterUkuran/add"; 
import MasterUkuranIndex from "./Component/Page/MasterUkuran/index";
import MasterUkuranUpdate from "./Component/Page/MasterUkuran/update";

export default function App() {
  return (
    <Router>
      <Header />     
      <Menu />
      <ContentBody>
        <Routes>
          <Route exact path="/" element={<Beranda />} />
          
          <Route exact path="/LihatTransaksi" element={<IndexTransaksi />} />
          <Route exact path="/AddTransaksi" element={<AddTransaksi />} />

          <Route exact path="/master_produk" element={<MasterProduk />} />
          <Route exact path="/AddProduk" element={<MasterProdukAdd />} />
          <Route exact path="/LihatProduk" element={<MasterProdukIndex />} />
          <Route exact path="/UpdateProduk" element={<MasterProdukUpdate />} />

          
          <Route exact path="/AddUkuran" element={<MasterUkuranAdd />} />
          <Route exact path="/LihatUkuran" element={<MasterUkuranIndex />} />
          <Route exact path="/UpdateUkuran" element={<MasterUkuranUpdate />} />
        </Routes>
      </ContentBody>
    </Router>
  );
}
