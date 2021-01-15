import React,{Fragment} from 'react';
import cookie from 'react-cookies'

const Header=()=>{
    let token=cookie.load('token');

    let auth=(
        <Fragment>
        <li className="nav-item">
            <a className="nav-link" href="/login">Giriş</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="/register">Qeydiyyat</a>
        </li>
        </Fragment>
         )

    if(token){
        auth=(
            <Fragment>
            <li className="nav-item">
                <a className="nav-link" href="/create">Yeni məhsul</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/logout">Çıxış</a>
            </li>
            </Fragment>
        )
    }



    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">Embawood</a>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">Əsas səhifə <span className="sr-only">(current)</span></a>
                    </li>
                    {auth}


                </ul>
            </div>
        </nav>
    )
}

export default Header;
