import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { listUkurans, deleteUkuran } from '../../../services/UkuranService';

export default function UkuranIndex() {
  const [ukurans, setUkurans] = useState([]);
  const [ukuranData, setUkuranData] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const [selectedUkuran, setSelectedUkuran] = useState(null);

  const handleSelectUkuran = (row) => {
    setSelectedUkuran(row);
    navigate('/UpdateUkuran', { state: { selectedRow: row } });
  };  
  
  useEffect(() =>{
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

  const hapusUkuran = (ukuranId) => {
    deleteUkuran(ukuranId)
      .then(() => {
        listUkurans()
          .then(response => {
            setUkurans(response.data.data);
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      });
  };

  const filteredData = ukurans.filter((data) => {
    return (
      data.ukr_nama.toLowerCase().includes(searchText.toLowerCase()) ||
      (data.ukr_kategori !== null && data.ukr_kategori.toString().includes(searchText.toLowerCase())) || 
      (data.ukr_kategori !== null && data.ukr_kategori.toString().includes(searchText.toLowerCase())) || 
      (data.ukr_panjang !== null && data.ukr_panjang.toString().includes(searchText)) ||
      (data.ukr_lebar_dada !== null && data.ukr_lebar_dada.toString().includes(searchText)) ||
      (data.ukr_tinggi !== null && data.ukr_tinggi.toString().includes(searchText)) ||
      (data.ukr_lingkar_pinggang !== null && data.ukr_lingkar_pinggang.toString().includes(searchText))
    );
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
      name: <span style={{ fontSize: '11pt', fontWeight: 'bold', textAlign: 'center' }}>Nama Ukuran</span>,
      selector: (row) => row.ukr_id,
      sortable: true,
      center: "true", 
      style: {
        fontSize: '11pt',
      },
    },
    {
      name: <span style={{ fontSize: '11pt', fontWeight: 'bold', textAlign: 'center' }}>Nama Ukuran</span>,
      selector: (row) => row.ukr_nama,
      sortable: true,
      center: "true", 
      style: {
        fontSize: '11pt',
      },
    },
    {
      name: <span style={{ fontSize: '11pt', fontWeight: 'bold', textAlign: 'center' }}>Kategori</span>,
      selector: (row) => {
        return row.ukr_kategori === 0 ? 'Baju' : 'Celana';
      },
      sortable: true,
      center: "true", 
      style: {
        fontSize: '11pt',
      },
    },

    {
      name: <span style={{ fontSize: '11pt', fontWeight: 'bold', textAlign: 'center' }}>Panjang</span>,
      selector: (row) => row.ukr_panjang !== null ? row.ukr_panjang : "-",
      sortable: true,
      center: "true",
      style: {
        fontSize: '11pt',
      },
    },
    {
      name: <span style={{ fontSize: '11pt', fontWeight: 'bold', textAlign: 'center' }}>Lebar Dada</span>,
      selector: (row) => row.ukr_lebar_dada !== null ? row.ukr_lebar_dada : "-",
      sortable: true,
      center: "true",
      style: {
        fontSize: '11pt',
      },
    },
    {
      name: <span style={{ fontSize: '11pt', fontWeight: 'bold', textAlign: 'center' }}>Tinggi</span>,
      selector: (row) => row.ukr_tinggi !== null ? row.ukr_tinggi : "-",
      sortable: true,
      center: "true",
      style: {
        fontSize: '11pt',
      },
    },
    {
      name: <span style={{ fontSize: '11pt', fontWeight: 'bold', textAlign: 'center' }}>Lingkar Pinggang</span>,
      selector: (row) => row.ukr_lingkar_pinggang !== null ? row.ukr_lingkar_pinggang : "-",
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
          <Button variant="warning" size="sm" className="btn btn-warning text-white bg-warning" onClick={() => handleSelectUkuran(row)} style={{ marginRight: '5px' }}>
            <i className="far fa-edit"></i>
          </Button>
          <Button variant="danger" size="sm" className="text-white bg-danger" onClick={() => hapusUkuran(row.ukr_id)}>
            <i className="far fa-trash-alt"></i>
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
          <span style={{ color: 'blue' }}><b>KIDS-ZONE</b></span> / Master - Ukuran
        </h6>
      </section>
      <br/>
      <div className="row">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <Link className="btn btn-primary btn-sm" to="/AddUkuran">
                    <i className="fas fa-plus"></i> Tambah Ukuran
                  </Link>
                  <input
                    type="text"
                    placeholder="Cari ukuran..."
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
  );
}
