import React from 'react';
import { Helmet } from 'react-helmet';
import DashStats from '../Pages/HomeDashPage/DashboardStats/DashStats';
import MenuList from '../Pages/HomeDashPage/MenuList/MenuList';
import CartDetails from '../Pages/HomeDashPage/CartDetails/CartDetails';

const DashboardPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Dashboard |Admin</title>
                <meta
                    name="description"
                    content="Dashboard page for Burgerizza admin to manage menu, stats, and cart details."
                />
            </Helmet>

            <div id="home_page">
                <div className='home_page_left'>
                    <DashStats />
                    <MenuList />
                </div>

                <div className='home_page_right'>
                    <CartDetails />
                </div>
            </div>
        </>
    );
};

export default DashboardPage;
