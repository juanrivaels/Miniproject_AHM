import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { updateProduk } from '../../../services/ProdukService';
import { listUkurans } from '../../../services/UkuranService';

function MasterProdukUpdate() {
  const location = useLocation();
  const navigate = useNavigate();
  const [produkId, setProdukId] = useState('');
  const [produkNama, setProdukNama] = useState('');
  const [produkKategori, setProdukKategori] = useState('');
  const [produkUkuran, setProdukUkuran] = useState('');
  const [produkDeskripsi, setProdukDeskripsi] = useState('');
  const [produkHarga, setProdukHarga] = useState('');
  const [produkStok, setProdukStok] = useState('');
  const [produkWarna, setProdukWarna] = useState('');
  const [ukurans, setUkurans] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchUkurans();
    if (location.state && location.state.selectedRow) {
      const { produkId, produkNama, produkKategori, produkUkuran, produkDeskripsi, produkHarga, produkStok, produkWarna } = location.state.selectedRow;
      setProdukId(produkId);
      setProdukNama(produkNama);
      setProdukKategori(produkKategori === 'Baju' ? '0' : '1');
      setProdukUkuran(produkUkuran);
      setProdukDeskripsi(produkDeskripsi);
      setProdukHarga(produkHarga);
      setProdukStok(produkStok);
      setProdukWarna(produkWarna);
    }
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
    setProdukUkuran(selectedUkuranId);
  };

  function editProduk(e){
    e.preventDefault();
    if (!produkNama || !produkDeskripsi || !produkHarga || !produkStok || !produkWarna) {
      alert('Data Tidak Boleh Kosong!!');
      return;
    }

    const produkHargaString = produkHarga.toString();
    const produk = {
      pro_id: produkId,
      pro_nama: produkNama,
      pro_kategori: produkKategori,
      pro_ukuran: produkUkuran,
      pro_deskripsi: produkDeskripsi,
      pro_harga: parseInt(produkHargaString.replace(/\D/g, ''), 10),
      pro_stok: parseInt(produkStok, 10),
      pro_warna: produkWarna
    };

    updateProduk(produk).then((response) => {
      alert("Produk Berhasil Diperbarui");
        navigate('/LihatProduk');
    });
  }

  function formatRupiah(angka) {
    return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return (
    <div>
      <section className="section" style={{ borderBottom: '1px solid #ccc' }}>
        <h6>
          <span style={{ color: 'blue' }}><b>KIDS-ZONE</b></span> / Master - Produk / Perbarui Produk
        </h6>
      </section>
      <br/>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              {successMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  {successMessage}
                  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
              )}
              <div className="col-md-12">
                <form>
                  <div className="form-group mb-3" >
                    <div className="form-group" style={{ display: 'none' }}>
                      <label className="control-label">ID Produk</label>
                      <input type="text" name="produkId" value={produkId} className='form-control form-control-sm'
                        onChange={(e) => setProdukId(e.target.value)} />
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    <div className="form-group">
                      <label className="control-label">Nama Produk <span style={{ color: 'red' }}>*</span></label>
                      <input type="text" name="produkNama" value={produkNama} className='form-control form-control-sm'
                        onChange={(e) => setProdukNama(e.target.value)} />
                    </div>
                  </div>

                  <div className="form-group mb-3">
                    <label className="control-label">Kategori <span style={{ color: 'red' }}>*</span></label>
                    <select name="produkKategori" className='form-control form-control-sm' value={produkKategori} onChange={(e) => setProdukKategori(e.target.value)}>
                      <option value="" disabled style={{ fontStyle: 'italic', pointerEvents: 'none' }}>-Pilih Kategori-</option>
                      <option value="0">Baju</option>
                      <option value="1">Celana</option>
                    </select>
                  </div>

                  <div className="form-group mb-3">
                    <div className="form-group">
                      <label className="control-label">Deskripsi Produk <span style={{ color: 'red' }}>*</span></label>
                      <input type="text" name="produkDeskripsi" value={produkDeskripsi} className='form-control form-control-sm'
                        onChange={(e) => setProdukDeskripsi(e.target.value)} />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                      <label className="control-label">Ukuran <span style={{ color: 'red' }}>*</span></label>
                        <select name="produkUkuran" value={produkUkuran}
                          className='form-control form-control-sm' onChange={onChangeUkuran}>
                          <option value="" disabled style={{ fontStyle: 'italic', pointerEvents: 'none' }}>-Pilih Ukuran-</option>
                          {ukurans.map((ukuran) => (
                            <option key={ukuran.ukr_id} value={ukuran.ukr_id}>{ukuran.ukr_nama}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group mb-3">
                      <label className="control-label">Harga <span style={{ color: 'red' }}>*</span></label>
                        <input type="text" name="produkHarga" className='form-control form-control-sm'
                          value={formatRupiah(produkHarga)} onChange={(e) => setProdukHarga(e.target.value.replace(/\./g, ''))} />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group mb-3">
                      <label className="control-label">Warna <span style={{ color: 'red' }}>*</span></label>
                        <input type="color" name="produkWarna" className='form-control form-control-sm'
                          value={produkWarna} onChange={(e) => setProdukWarna(e.target.value)} />
                      </div>
                      <div className="form-group mb-3">
                      <label className="control-label">Stock <span style={{ color: 'red' }}>*</span></label>
                        <input type="number" name="produkStok" className='form-control form-control-sm'
                          value={produkStok} onChange={(e) => setProdukStok(e.target.value)} />
                      </div>
                    </div>
                  </div>

                  {error && <div className="alert alert-danger">{error}</div>}

                  <br />
                  <div className="form-group text-end">
                      <Link to="/LihatProduk" className="btn btn-warning btn-sm">
                        <i className="fas fa-arrow-left"></i> Kembali
                      </Link>
                      <span style={{ marginLeft: '5px' }}></span> 
                      <button type="submit" className="btn btn-success btn-sm" onClick={editProduk}>
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

export default MasterProdukUpdate;
