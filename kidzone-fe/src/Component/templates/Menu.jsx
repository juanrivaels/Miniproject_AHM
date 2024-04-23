import React, { useState } from 'react';
import { ROOT_LINK } from "../util/Constants"; // Mengimpor link root dari file Constants

const Menu = () => {
  // State untuk melacak penampilan submenu "Master"
  const [masterSubMenuOpen, setMasterSubMenuOpen] = useState(false);
  // State untuk melacak penampilan submenu "Transaksi"
  const [transaksiSubMenuOpen, setTransaksiSubMenuOpen] = useState(false);

  const arrMenu = [
    { head: "Dashboard", headkey: "dashboard", link: ROOT_LINK, sub: [], icon: "fa fa-home fa-lg" }, // Contoh ikon menggunakan Font Awesome
    { head: "Master", headkey: 1, link: "#", sub: [
      { title: "Master Ukuran", link: `${ROOT_LINK}/LihatUkuran` },
      { title: "Master Produk", link: `${ROOT_LINK}/LihatProduk` }
    ], icon: "fas fa-cogs fa-lg" }, // Ikon untuk "Master"
    { head: "Transaksi", headkey: 2, link: "#", sub: [
      { title: "Penjualan Produk", link: `${ROOT_LINK}/LihatTransaksi`, icon: "fas fa-shopping-cart fa-lg" } // Ikon untuk "Penjualan Produk"
    ], icon: "fas fa-exchange-alt fa-lg" } // Ikon untuk "Transaksi"
  ];

  // Fungsi untuk menangani klik pada menu "Master" dan menampilkan atau menyembunyikan submenu
  const handleMasterMenuClick = () => {
    setMasterSubMenuOpen(!masterSubMenuOpen);
  };

  // Fungsi untuk menangani klik pada menu "Transaksi" dan menampilkan atau menyembunyikan submenu
  const handleTransaksiMenuClick = () => {
    setTransaksiSubMenuOpen(!transaksiSubMenuOpen);
  };

  return (
    <div className="polman-nav-static-right collapse scrollstyle" id="menu">
      <div id="accordions" role="tablist" aria-multiselectable="true">
        <div className="list-group">
          {arrMenu.map((menu, index) => (
            <div key={index}>
              {/* Menampilkan menu "Master" dengan event handler untuk menampilkan/menyembunyikan submenu */}
              {menu.head === "Master" ? (
                <div>
                  <a href="#" className='list-group-item list-group-item-action' style={{ borderRadius: '0px', border: 'none', paddingLeft: '22px', display: 'inherit' }} onClick={handleMasterMenuClick}>
                    <i className={menu.icon} style={{ marginRight: '5px', fontSize: '16px' }}></i> {/* Mengubah ukuran ikon menjadi 16px */}
                    {menu.head}
                  </a>
                  {/* Menampilkan submenu "Master" jika masterSubMenuOpen bernilai true */}
                  {masterSubMenuOpen && (
                    <div>
                      {menu.sub.map((subMenu, subIndex) => (
                        <a key={subIndex} href={subMenu.link} className='list-group-item list-group-item-action' style={{ borderRadius: '0px', border: 'none', paddingLeft: '40px', display: 'inherit' }}>
                          <i className="fas fa-minus" style={{ marginRight: '5px', fontSize: '12px' }}> </i> {/* Mengubah ukuran ikon submenu menjadi 12px */}
                          {subMenu.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                // Menampilkan menu "Transaksi" dengan event handler untuk menampilkan/menyembunyikan submenu
                menu.head === "Transaksi" ? (
                  <div>
                    <a href="#" className='list-group-item list-group-item-action' style={{ borderRadius: '0px', border: 'none', paddingLeft: '22px', display: 'inherit' }} onClick={handleTransaksiMenuClick}>
                      <i className={menu.icon} style={{ marginRight: '5px', fontSize: '16px' }}></i> {/* Mengubah ukuran ikon menjadi 16px */}
                      {menu.head}
                    </a>
                    {/* Menampilkan submenu "Transaksi" jika transaksiSubMenuOpen bernilai true */}
                    {transaksiSubMenuOpen && (
                      <div>
                        {menu.sub.map((subMenu, subIndex) => (
                          <a key={subIndex} href={subMenu.link} className='list-group-item list-group-item-action' style={{ borderRadius: '0px', border: 'none', paddingLeft: '40px', display: 'inherit' }}>
                            <i className="fas fa-minus" style={{ marginRight: '5px', fontSize: '12px' }}> </i> {/* Mengubah ukuran ikon submenu menjadi 12px */}
                            {subMenu.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  // Menampilkan menu lainnya
                  <a href={menu.link === "#" ? `#menucollapse${menu.headkey}` : menu.link} className='list-group-item list-group-item-action' style={{ borderRadius: '0px', border: 'none', paddingLeft: '22px', display: 'inherit', marginBottom: '5px' }}> {/* Menambahkan margin bottom untuk jarak antar menu */}
                    <i className={menu.icon} style={{ marginRight: '5px', fontSize: '16px' }}></i> {/* Mengubah ukuran ikon menjadi 16px */}
                    {menu.head}
                  </a>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Menu;
