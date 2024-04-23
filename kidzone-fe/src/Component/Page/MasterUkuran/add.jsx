// add.jsx 
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { createUkuran } from '../../../services/UkuranService';

function MasterUkuranAdd() {
  const [ukr_nama, setUkr_nama] = useState('');
  const [ukr_kategori, setUkr_kategori] = useState('');
  const [ukr_panjang, setUkr_panjang] = useState('');
  const [ukr_lingkar_pinggang, setUkr_lingkar_pinggang] = useState('');
  const [ukr_lebar_dada, setUkr_lebar_dada] = useState('');
  const [ukr_tinggi, setUkr_tinggi] = useState('');
  const navigate = useNavigate();

  function saveUkuran(e){
    e.preventDefault();
    const ukuran = { ukr_nama, ukr_kategori, ukr_panjang, ukr_lingkar_pinggang, 
      ukr_lebar_dada, ukr_tinggi};

    createUkuran(ukuran).then((response) => {
        navigate('/LihatUkuran');
    });
  }

  // Your component code here
  return (
    <div className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Add Ukuran</h4>
              </div>
              <div className="card-body">
                <form method="post">
                  <div className="form-group mb-3">
                    <div className="form-group">
                      <label className="control-label">Nama Ukuran <span style={{ color: 'red' }}>*</span></label>
                      <input type="text" name="ukr_nama" value={ukr_nama} className='form-control'
                                onChange={(e) => setUkr_nama(e.target.value)} />
                    </div>
                  </div>

                  <div className="form-group mb-3">
                    <label className="control-label">Kategori <span style={{ color: 'red' }}>*</span></label>
                    <select name="ukr_kategori" className="form-control" value={ukr_kategori} onChange={(e) => setUkr_kategori(e.target.value)}>
                      <option value="" disabled>Pilih Kategori</option>
                      <option value="0">Baju</option>
                      <option value="1">Celana</option>
                    </select>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label className="control-label">Panjang</label>
                        <input type="text" name="ukr_panjang" className="form-control"
                        value={ukr_panjang} onChange={(e) => setUkr_panjang(e.target.value)} />
                      </div>
                      <div className="form-group mb-3">
                        <label className="control-label">Linkar Pinggang</label>
                        <input type="text" name="ukr_lingkar_pinggang" className="form-control" 
                        value={ukr_lingkar_pinggang} onChange={(e) => setUkr_lingkar_pinggang(e.target.value)} />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label className="control-label">Lebar Dada</label>
                        <input type="text" name="ukr_lebar_dada" className="form-control" 
                        value={ukr_lebar_dada} onChange={(e) => setUkr_lebar_dada(e.target.value)} />
                      </div>
                      <div className="form-group mb-3">
                        <label className="control-label">Tinggi</label>
                        <input type="text" name="ukr_tinggi" className="form-control" 
                        value={ukr_tinggi} onChange={(e) => setUkr_tinggi(e.target.value)} />
                      </div>
                    </div>
                  </div>
                  
                  <br />
                  <div className="form-group">
                    <button className="btn btn-primary" onClick={saveUkuran}>Simpan</button>
                    <span style={{ marginLeft: '5px' }}></span>
                    <Link to="/LihatUkuran" className="btn btn-secondary">Kembali</Link>
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

export default MasterUkuranAdd;
