import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='flex justify-between bg-transparent text-black font-bold text-2xl'>
      <Link to="/cart">
        <p>Cart</p>
      </Link>

      <Link to="/">
        <p>Logout</p>
      </Link>
    </div>
  );
};

export default Header;
