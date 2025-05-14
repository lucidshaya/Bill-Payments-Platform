import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer style={{ textAlign: 'center', padding: '1rem', marginTop: '2rem' }}>
            <p>&copy; {currentYear} 401 Technologies. All rights reserved.</p>
        </footer>
    );
};

export default Footer;