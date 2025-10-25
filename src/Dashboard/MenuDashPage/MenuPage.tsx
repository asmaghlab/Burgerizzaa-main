import React from 'react';
import { Helmet } from 'react-helmet-async'; 
import Menu from '../Pages/MenuPage/MenuPage';

const MenuPageComponent: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Menu | Admin</title>
                <meta
                    name="description"
                    content="Explore our delicious burger menu at Burgerizza!"
                />
            </Helmet>

            <div>
                <Menu />
            </div>
        </>
    );
};

export default MenuPageComponent;
