import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { createProduk } from '../../../services/ProdukService';
import { listUkurans } from '../../../services/UkuranService';

function MasterProdukAdd() {
  const [pro_nama, setPro_nama] = useState('');
  const [pro_kategori, setPro_kategori] = useState('');
  const [pro_ukuran, setPro_ukuran] = useState('');
  const [pro_deskripsi, setPro_deskripsi] = useState('');
  const [pro_harga, setPro_harga] = useState('');
  const [pro_stok, setPro_stok] = useState('');
  const [pro_warna, setPro_warna] = useState('#ffffff');
  const [ukurans, setUkurans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUkurans();
  }, []);

  const fetchUkurans = async () => {
    try {
      const response = await listUkurans();
      setUkurans(response.data.data);
    } catch (error) {
      console.error("Error fetching ukurans:", error);
    }
  };

  const onChangeUkuran = (e) => {
    const selectedUkuranId = e.target.value;
    setPro_ukuran(selectedUkuranId);
  };

  const formatRupiah = (angka) => {
    return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  function saveProduk(e){
    e.preventDefault();

    if (!pro_nama || !pro_kategori || !pro_ukuran || !pro_deskripsi || !pro_harga || !pro_stok || !pro_warna) {
        alert("Data Tidak Boleh Kosong!!");
        return;
    }

    const formattedHarga = pro_harga.replace(/\./g, '');
    const produk = { pro_nama, pro_kategori, pro_ukuran, pro_deskripsi, pro_harga: formattedHarga, pro_stok, pro_warna };

    createProduk(produk).then((response) => {
        alert("Produk Berhasil Ditambahkan");
        navigate('/LihatProduk');
    });
  }

  const handleChangeHarga = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setPro_harga(formatRupiah(value));
  };

  return (
    <div>
      <section className="section" style={{ borderBottom: '1px solid #ccc' }}>
        <h6>
          <span style={{ color: 'blue' }}><b>KIDS-ZONE</b></span> / Master - Produk / Tambah Produk
        </h6>
      </section>
      <br/>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                <div className="col-md-12">
                <form method="post">
                  <div className="form-group mb-3">
                    <div className="form-group">
                      <label className="control-label">Nama Produk <span style={{ color: 'red' }}>*</span></label>
                      <input type="text" name="pro_nama" value={pro_nama} className='form-control form-control-sm'
                        onChange={(e) => setPro_nama(e.target.value)} />
                    </div>
                  </div>

                  <div className="form-group mb-3">
                    <label className="control-label">Kategori <span style={{ color: 'red' }}>*</span></label>
                    <select name="pro_kategori" className='form-control form-control-sm' value={pro_kategori} onChange={(e) => setPro_kategori(e.target.value)}>
                      <option value="" disabled style={{ fontStyle: 'italic', pointerEvents: 'none' }}>-Pilih Kategori-</option>
                      <option value="0">Baju</option>
                      <option value="1">Celana</option>
                    </select>
                  </div>

                  <div className="form-group mb-3">
                    <div className="form-group">
                      <label className="control-label">Deskripsi Produk <span style={{ color: 'red' }}>*</span></label>
                      <input type="text" name="pro_deskripsi" value={pro_deskripsi} className='form-control form-control-sm'
                                onChange={(e) => setPro_deskripsi(e.target.value)} />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label className="control-label">Ukuran <span style={{ color: 'red' }}>*</span></label>
                        <select name="pro_ukuran" value={pro_ukuran} className='form-control form-control-sm' onChange={onChangeUkuran}>
                          <option value="" disabled style={{ fontStyle: 'italic', pointerEvents: 'none' }}>-Pilih Ukuran-</option>
                          {ukurans.map((ukuran) => (
                          <option key={ukuran.ukr_id} value={ukuran.ukr_id}>{ukuran.ukr_nama}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group mb-3">
                        <label className="control-label">Harga <span style={{ color: 'red' }}>*</span></label>
                        <input type="text" name="pro_harga" className='form-control form-control-sm' 
                        value={pro_harga} onChange={handleChangeHarga} />
                      </div>
                    </div>

                    <div className="col-md-6">
                    <div className="form-group mb-3">
                        <label className="control-label">Warna <span style={{ color: 'red' }}>*</span></label>
                        <input type="color" name="pro_warna" className='form-control form-control-sm' 
                              value={pro_warna} onChange={(e) => setPro_warna(e.target.value)} />
                    </div>


                      <div className="form-group mb-3">
                        <label className="control-label">Stock <span style={{ color: 'red' }}>*</span></label>
                        <input type="number" name="pro_stok" className='form-control form-control-sm'
                        value={pro_stok} onChange={(e) => setPro_stok(e.target.value)} />
                      </div>
                    </div>
                  </div>
                  
                  <br />
                    <div className="form-group text-end">
                      <Link to="/LihatProduk" className="btn btn-warning btn-sm">
                        <i className="fas fa-arrow-left"></i> Kembali
                      </Link>
                      <span style={{ marginLeft: '5px' }}></span> 
                      <button type="submit" className="btn btn-success btn-sm" onClick={saveProduk}>
                        <i className="fas fa-save"></i> Simpan
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default MasterProdukAdd;
