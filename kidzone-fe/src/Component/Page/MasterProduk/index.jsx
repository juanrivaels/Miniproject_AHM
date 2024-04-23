import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import {Button} from 'react-bootstrap';
import { listProduks, deleteProduk } from '../../../services/ProdukService';
import { listUkurans } from '../../../services/UkuranService';
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Modal } from 'react-bootstrap';


export default function MasterProdukIndex() {
  const [produks, setProduks] = useState([]);
  const [ukurans, setUkurans] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSelectProduct = (row) => {
    setSelectedProduct(row);
    navigate('/UpdateProduk', { state: { selectedRow: row } });
  };  

  useEffect(() =>{
    listProduks()
      .then(response => {
        setProduks(response.data.data);
      })
      .catch(error => {
        console.error(error);
      });

    listUkurans()
      .then(response => {
        setUkurans(response.data.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleDetailClick = (transaction) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const hapusProduk = (produkId) => {
    deleteProduk(produkId)
      .then(() => {
        listProduks()
          .then(response => {
            setProduks(response.data.data);
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      });
  };

  const filteredData = produks.filter((data) => {
    return (
      data.produkNama.toLowerCase().includes(searchText.toLowerCase()) ||
      (data.produkKategori !== null && data.produkKategori.toString() === '0' && 'Baju'.includes(searchText.toLowerCase())) || 
      (data.produkKategori !== null && data.produkKategori.toString() === '1' && 'Celana'.includes(searchText.toLowerCase())) || 
      (data.produkDeskripsi !== null && data.produkDeskripsi.toLowerCase().includes(searchText.toLowerCase())) ||
      (data.produkHarga !== null && data.produkHarga.toString().includes(searchText)) ||
      (data.produkStok !== null && data.produkStok.toString().includes(searchText)) ||
      (data.produkWarna !== null && data.produkWarna.toLowerCase().includes(searchText.toLowerCase()))
    );
  });

  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });
  const columns = [
    {
      name: <span style={{ fontSize: '11pt', fontWeight: 'bold', textAlign: 'center' }}>Nomor</span>,
      selector: (row, index) => index + 1,
      sortable: true,
      center: "true", 
      style: {
        fontSize: '11pt',
      },
    },
    {
      name: <span style={{ fontSize: '11pt', fontWeight: 'bold', textAlign: 'center' }}>ID Produk</span>,
      selector: (row) => `PRD00${row.produkId}`,
      sortable: true,
      center: "true", 
      style: {
        fontSize: '11pt',
      },
    },
    {
      name: <span style={{ fontSize: '11pt', fontWeight: 'bold', textAlign: 'center' }}>Nama Produk</span>,
      selector: (row) => row.produkNama,
      sortable: true,
      center: "true", 
      style: {
        fontSize: '11pt',
      },
    },
    {
      name: <span style={{ fontSize: '11pt', fontWeight: 'bold', textAlign: 'center' }}>Kategori</span>,
      selector: (row) => row.produkKategori,
      sortable: true,
      center: "true", 
      style: {
        fontSize: '11pt',
      },
    },

    {
      name: <span style={{ fontSize: '11pt', fontWeight: 'bold', textAlign: 'center' }}>Ukuran</span>,
      selector: (row) => {
        const ukuran = ukurans.find((ukuran) => ukuran.ukr_id === row.produkUkuran);
        return ukuran ? ukuran.ukr_nama : "-";
      },
      sortable: true,
      center: "true",
      style: {
        fontSize: '11pt',
      },
    },
    {
      name: <span style={{ fontSize: '11pt', fontWeight: 'bold', textAlign: 'center' }}>Harga</span>,
      selector: (row) => formatter.format(row.produkHarga),
      sortable: true,
      center: "true",
      style: {
        fontSize: '11pt',
      },
    },
    {
      name: <span style={{ fontSize: '11pt', fontWeight: 'bold', textAlign: 'center' }}>Stok</span>,
      selector: (row) => row.produkStok !== null ? row.produkStok : "-",
      sortable: true,
      center: "true",
      style: {
        fontSize: '11pt',
      },
    },

    {
      name: <span style={{ fontSize: '11pt', fontWeight: 'bold', textAlign: 'center' }}>Aksi</span>,
      cell: (row) => (
        <div style={{ textAlign: 'center' }}>
          <Button variant="warning" size="sm" className="btn btn-warning text-white bg-warning" onClick={() => handleSelectProduct(row)} style={{ marginRight: '5px' }}>
            <i className="far fa-edit"></i>
          </Button>
          
          <Button 
              variant="danger" 
              size="sm" 
              className="text-white bg-danger" 
              onClick={() => {
                if (window.confirm('Apakah Anda yakin ingin menghapus data?')) {
                  hapusProduk(row.produkId);
                }
              }} 
              style={{ marginRight: '5px' }}
            >
              <i className="far fa-trash-alt"></i>
            </Button>

          <Button variant="info" size="sm" onClick={() => handleDetailClick(row)} className="text-white bg-info">
            <i className="far fa-eye"></i>
          </Button>
        </div>
      ),
      center: "true", 
      style: {
        fontSize: '11pt',
      },
    },
  ];

  return (
    <div>
      <section className="section" style={{ borderBottom: '1px solid #ccc' }}>
        <h6>
          <span style={{ color: 'blue' }}><b>KIDS-ZONE</b></span> / Master - Produk
        </h6>
      </section>
      <br/>
      <div className="row">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                <div className="col-12">
                  <Link className="btn btn-primary btn-sm" to="/AddProduk">
                    <i className="fas fa-plus"></i> Tambah Produk
                  </Link>
                  <input
                    type="text"
                    placeholder="Cari produk..."
                    className="form-control mt-3 mb-3"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />

                  <DataTable
                    columns={columns}
                    data={filteredData}
                    pagination
                    striped
                    highlightOnHover
                    pointerOnHover
                    className="table-sm"
                  />

                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header className="bg-info text-white align-items-center justify-content-center">
          <Modal.Title className="text-center w-100">Detail Produk</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-3">
                <p>ID Produk</p>
                <p>Deskripsi Produk</p>
                <p>Warna Produk</p>
              </div>
              <div className="col-sm-9">
                <p className="fw-semi-bold">PRD00{selectedTransaction && selectedTransaction.produkId}</p>
                <p className="fw-semi-bold">{selectedTransaction && selectedTransaction.produkDeskripsi}</p>
                <input
                  type="color"
                  className="form-control"
                  value={selectedTransaction && selectedTransaction.produkWarna}
                  style={{ fontWeight: 'bold', color: selectedTransaction && selectedTransaction.produkWarna }}
                  readOnly
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger btn-sm" onClick={handleCloseModal}>
             <i className="fas fa-close"></i> Keluar
          </button>
        </Modal.Footer>
      </Modal>


  </div>
  );
}
