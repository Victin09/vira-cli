import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (): JSX.Element => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand" href="#">
                    React Bootstrap App
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarText"
                    aria-controls="navbarText"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/about" className="nav-link active" aria-current="page" href="#">
                                About
                            </Link>
                        </li>
                    </ul>
                    <Link to="/" className="navbar-text">
                        Log in
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
