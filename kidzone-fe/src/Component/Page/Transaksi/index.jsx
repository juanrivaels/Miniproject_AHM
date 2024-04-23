import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

import { listPenjualan } from '../../../services/TransaksiService';



export default function TransaksiIndex() {
  const [Penjualan, setProduks] = useState([]);

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState(''); 

  const handleDetailClick = (transaction) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };

  useEffect(() =>{
    listPenjualan()
      .then(response => {
        setProduks(response.data.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);



  const handleCloseModal = () => {
    setShowModal(false);
  };

  const filteredData = Penjualan.filter((data) => {
    return (
      (data.penjualanId && data.penjualanId.toString().includes(searchText)) ||
      (data.penjualanTanggal && data.penjualanTanggal.includes(searchText)) ||
      (data.penjualanTotalHarga && data.penjualanTotalHarga.toString().includes(searchText))
    );
  });

  const formatNumber = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(number);
  };


  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
  };

  const columns = [
    {
      name: <span style={{ fontSize: '11pt', fontWeight: 'bold', textAlign: 'center' }}>Nomor</span>,
      selector: (row, index) => index + 1,
      sortable: true,
      center: true, 
      style: {
        fontSize: '11pt',
      },
    },

    {
      name: <span style={{ fontSize: '11pt', fontWeight: 'bold', textAlign: 'center' }}>ID Transaksi</span>,
      selector: (row) => `TRS00${row.penjualanId}`,
      sortable: true,
      center: true, 
      style: {
        fontSize: '11pt',
      },
    },

    {
      name: <span style={{ fontSize: '11pt', fontWeight: 'bold', textAlign: 'center' }}>Tanggal Transaksi</span>,
      selector: (row) => {
        const date = new Date(row.penjualanTanggal);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Intl.DateTimeFormat('id-ID', options).format(date);
      },
      sortable: true,
      center: true,
      style: {
        fontSize: '11pt',
      },
    },

    {
      name: <span style={{ fontSize: '11pt', fontWeight: 'bold', textAlign: 'center' }}>Total harga</span>,
      selector: (row) => formatter.format(row.penjualanTotalHarga),
      sortable: true,
      center: true, 
      style: {
        fontSize: '11pt',
      },
    },

  {
    name: <span style={{ fontSize: '11pt', fontWeight: 'bold', textAlign: 'center' }}>Aksi</span>,
    cell: (row) => (
      <Button variant="info" size="sm" onClick={() => handleDetailClick(row)} className="text-white bg-info">
        <i className="far fa-eye"></i> Detail
      </Button>
    ),
    center: true, 
    style: {
      fontSize: '11pt',
    },
  }
    
  ];



  return (
    <div>
      <section className="section" style={{ borderBottom: '1px solid #ccc' }}>
        <h6>
          <span style={{ color: 'blue' }}><b>KIDS-ZONE</b></span> / Transaksi - Penjualan Produk
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
                  <Link className="btn btn-primary btn-sm" to="/AddTransaksi">
                    <i className="fas fa-plus"></i> Tambah Transaksi
                  </Link>
                  <input
                    type="text"
                    placeholder="Cari transaksi..."
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
          <Modal.Title className="text-center w-100">Detail Transaksi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <div className="container-fluid">
            <div className="row ps-3">
              <div className="col-sm-3">
                <p>ID Transaksi</p>
                <p>Tanggal Transaksi</p>
                <p>Total Harga</p>
              </div>
              <div className="col-sm-9">
                <p className="fw-semi-bold">: TRS00{selectedTransaction && selectedTransaction.penjualanId}</p>
                <p className="fw-semi-bold">: {selectedTransaction && formatDate(selectedTransaction.penjualanTanggal)}</p>
                <p className="fw-semi-bold">: {selectedTransaction && formatNumber(selectedTransaction.penjualanTotalHarga)}</p>
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
