import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@restart/ui/esm/Button';
import React from 'react';
import { NavLink } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';
const Notfound = () => {
    return (
        <div>
            <Header></Header>
            
            <div className="bodyheight d-block mb-5 mt-5">
            <div className="d-flex flex-column align-content-center align-items-center">
                 <p className="text-center  fs-1 mt-5">This Page You Looking </p>
                 <p className="text-center text-danger fw-bold fs-1 ">Not Found </p>
                <NavLink to='/home'>  <Button className="border-0 navBg fs-5 rounded-2 text-white py-3 px-5">Go Back Home <FontAwesomeIcon icon={faHome}/></Button></NavLink>
           </div>
        </div>

            <Footer/>
        </div>
    );
};

export default Notfound;