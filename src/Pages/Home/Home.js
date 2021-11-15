import React from 'react';
import Products from '../Product/Products/Products';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';
import Aboutus from './Aboutus/Aboutus';
import Bannar from './Bannar/Bannar';
import Review from './Review/Review';


const Home = () => {
    const height = {
        height:"60vh"
    };
    return (
        <div style={height} >
           <Header></Header>
           <Bannar/>
            <div className="my-5">
                <Products />
            </div>
            
            <div className="my-5">
                <Aboutus/>
            </div>
            
            <div className="my-5">
                <Review/>
            </div>
        <Footer/>
        </div>
    );
};

export default Home;