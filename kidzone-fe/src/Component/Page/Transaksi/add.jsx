import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { createPenjualan } from '../../../services/TransaksiService';
import { listProduks } from '../../../services/ProdukService';


function TambahTransaksi() {
  const [idProdukList, setSelectedProduks] = useState([]); 
  const [produkData, setProdukData] = useState([]); 
  const [isTableVisible, setIsTableVisible] = useState(false); 
  const [tanggalTransaksi, setTanggalTransaksi] = useState(new Date().toLocaleDateString()); 
  const [total_harga, setTotalHarga] = useState(0); 
  const [produks, setProduks] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    fetchListProduk();
  }, []);

  useEffect(() => {
    console.log(produkData);
  }, [produkData]);

  useEffect(() => {
    console.log(idProdukList);
  }, [idProdukList]);



  const fetchListProduk = async () => {
    try {
      const response = await listProduks();
      setProduks(response.data.data);
    } catch (error) {
      console.error("Error fetching produks:", error);
    }
  };

  const fetchProdukData = (selectedProdukId) => {
    const produkId = parseInt(selectedProdukId);
    const selectedProduk = produks.find((produk) => produk.produkId === produkId);
  
    if (selectedProduk) {
      return { judul: selectedProduk.produkNama, jumlah: 1, harga: selectedProduk.produkHarga }; 
    } else {
      return { };
    }
  };
  

  const handleProdukChange = (event) => {
    const { value } = event.target;
    setSelectedProduks([...idProdukList, value]); 
    const newProdukData = [...produkData, fetchProdukData(value)]; 
    setProdukData(newProdukData); 
    setIsTableVisible(true); 
    calculateTotalHarga(newProdukData);
  };

  const handleQuantityChange = (index, event) => {
    const { value } = event.target;
    const updatedProdukData = [...produkData];
    updatedProdukData[index].jumlah = value;
    setProdukData(updatedProdukData);
    calculateTotalHarga(updatedProdukData); 
  };


  const handleDeleteProduk = (index) => {
    const updatedProdukData = [...produkData];
    updatedProdukData.splice(index, 1); 
    setProdukData(updatedProdukData); 
    calculateTotalHarga(updatedProdukData); 
  };


  const calculateTotalHarga = (updatedProdukData) => {
    let total = 0;
    updatedProdukData.forEach((produk) => {
      total += produk.jumlah * produk.harga;
    });
    setTotalHarga(total); 
  };


  function saveTransaksi(e){
    e.preventDefault();
    
    if (total_harga === 0) {
      alert("Silahkan Pilih Produk!!");
      return; 
    }
    
    const penjualan = {tanggalTransaksi, total_harga, idProdukList};
  
    createPenjualan(penjualan).then((response) => {
      alert("Transaksi Berhasil Ditambahkan");
      navigate('/LihatTransaksi');
    });
  }
  

  return (
    <div>
      <section className="section" style={{ borderBottom: '1px solid #ccc' }}>
        <h6>
          <span style={{ color: 'blue' }}><b>KIDS-ZONE</b></span> / Transaksi - Penjualan Produk / Tambah Transaksi
        </h6>
      </section>
      <br/>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <form>
                    <div className="form-group mb-3"> 
                      <label className="control-label">
                        Tanggal Transaksi <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input type="text" name="" className='form-control form-control-sm'
                      value={tanggalTransaksi} onChange={(e) => setTanggalTransaksi(e.target.value)} readOnly />
                    </div>
                    <br />

                    <div className="form-group mb-3"> 
                      <label className="control-label">
                        Produk <span style={{ color: 'red' }}>*</span>
                      </label>
                      
                      <select className='form-control form-control-sm' onChange={handleProdukChange}>
                        <option value="" disabled selected style={{ fontStyle: 'italic' }}>- Pilih Produk- </option>
                        {produks.map((produk) => (
                          <option key={produk.produkId} value={produk.produkId}>{produk.produkNama}</option>
                        ))}
                      </select>

                      <div style={{ marginLeft: '1rem', fontStyle: 'italic', fontSize: '10pt', color: 'red' }}>Note: Anda dapat memilih lebih dari satu produk.</div>
                    </div>

                    {isTableVisible && (
                      <div className="form-group mb-3"> 
                        <div className="card"> 
                          <div className="card-body">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th>Nama Produk</th>
                                  <th>Jumlah</th>
                                  <th>Sub Harga</th> 
                                </tr>
                              </thead>
                              <tbody>
                                {produkData.map((data, index) => (
                                  <tr key={index}>
                                    <td>{data.judul}</td>
                                    <td>
                                      <input
                                        type="number"
                                        min="1"
                                        value={data.jumlah}
                                        onChange={(event) => handleQuantityChange(index, event)}
                                        className="form-control"
                                      />
                                    </td>
                                    <td>{data.jumlah * data.harga}</td> 
                                    <td>
                                      <button
                                        type="button"
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDeleteProduk(index)}
                                      >
                                        <i className="fas fa-trash-alt"></i> Hapus
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}
                    <br />

                    <div className="form-group mb-3"> 
                      <label className="control-label">
                        Total Harga <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input type="text" name="" className='form-control form-control-sm' 
                      value={total_harga} onChange={(e) => setTotalHarga(e.target.value)} readOnly />
                    </div>
                    <br />

                    <div className="form-group text-end">
                      <Link to="/LihatTransaksi" className="btn btn-warning btn-sm">
                        <i className="fas fa-arrow-left"></i> Kembali
                      </Link>
                      <span style={{ marginLeft: '5px' }}></span> 
                      <button type="submit" className="btn btn-success btn-sm" onClick={saveTransaksi}>
                        <i className="fas fa-save"></i> Simpan
                      </button>
                    </div>

                  </form>
                </div>
              </div>
            </div>
      </div>
    </div>
  );
}

export default TambahTransaksi;
