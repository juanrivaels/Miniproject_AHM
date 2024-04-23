import React, { useEffect, useState } from 'react';
import { listProduks } from '../../../services/ProdukService';

const BarChart = () => {
    const [produks, setProduks] = useState([]);

    useEffect(() => {
        // Memuat data produk saat komponen dimuat
        listProduks()
            .then(response => {
                setProduks(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });

        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawCharts);
    }, [produks]); // Menambahkan produks sebagai dependensi

    function drawCharts() {
        drawChart1();
    }

    function drawChart1() {
        var maxStock = Math.max(...produks.map(produk => produk.produkStok)); // Temukan nilai stok terbesar
        var maxY = Math.ceil(maxStock / 5) * 5; // Bulatkan ke atas menjadi kelipatan 5 terdekat

        var data1 = new google.visualization.DataTable();
        data1.addColumn('string', 'Produk');
        data1.addColumn('number', 'Jumlah');

        // Mengisi data produk dari state produks
        data1.addRows(produks.map(produk => [produk.produkNama, produk.produkStok]));

        var options1 = {
            hAxis: {title: '', titleTextStyle: {color: '#333'}},
            vAxis: {minValue: 0, maxValue: maxY, gridlines: {count: maxY / 5}} // Set nilai maksimum dan minimum sumbu Y, serta jumlah gridlines
        };
        var chart1 = new google.visualization.ColumnChart(document.getElementById('barChart1'));
        chart1.draw(data1, options1);
    }

    return (
        <div>
            <section className="section" style={{ borderBottom: '1px solid #ccc' }}>
                <h6>
                    <span style={{ color: 'blue' }}><b>KIDS-ZONE</b></span> / Dashboard
                </h6>
            </section>
            <br/>
            
            <div className="row">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <div>
                                        <section className="section" style={{ borderBottom: '1px solid #ccc' }}>
                                            <br />
                                            <h6>Stock Produk</h6>
                                            <div id="barChart1" style={{ width: '100%', height: '300px' }}></div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BarChart;
