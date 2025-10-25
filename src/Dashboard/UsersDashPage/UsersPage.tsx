import React from 'react';
import { Helmet } from 'react-helmet-async';

const UsersPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Users | Admin</title>
                <meta
                    name="description"
                    content="Manage all users in the Burgerizza admin dashboard."
                />
            </Helmet>

            <div>UserPage</div>
        </>
    );
};

export default UsersPage;
