import React from 'react';

const HeaderComponent = () => {
    return (
        <header>
            <div className="polman-nav-static-top">
                <div className="float-left">
                    <a href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                        <img src="assets/img/favicon3.png" style={{ height: '50px' }} alt="logo" />
                        <span className="d-none d-lg-block" style={{ marginLeft: '10px', fontSize: '20px', fontWeight: 'bold' }}>KIDS-ZONE</span>
                    </a>
                </div>


                <div className="polman-menu" style={{ marginRight: '50px' }}>
                    <nav className="nav justify-content-end" style={{ paddingTop: '5px' }}>
                        <b id="username1" style={{ position: 'absolute' }}>KELOMPOK AHEM (ADMIN)</b>
                        <span id="lastlogin" style={{ fontSize: '11px', marginTop: '-2px', width: '500px', textAlign: 'right' }}>
                            <br /><br />Masuk terakhir: {new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta', hour12: false })}
                        </span>
                    </nav>
                </div>

                <div className="polman-notifikasi">
                    <div className="float-right">
                        <div className="fa fa-envelope fa-2x" style={{ marginTop: '8px', marginRight: '15px', cursor: 'pointer' }} aria-hidden="true"></div>
                        <span className="badge badge-pill badge-info polman-badge">0</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderComponent;
