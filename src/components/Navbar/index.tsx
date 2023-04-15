import React from 'react';
import { Link } from 'react-router-dom';
import { NavbarWrapper, NavbarLink } from './navbar-styles';

const Navbar: React.FC = () => {
  return (
    <NavbarWrapper>
      <Link to="/">
        <NavbarLink>Check</NavbarLink>
      </Link>
      <Link to="/blacklist">
        <NavbarLink>Blacklist</NavbarLink>
      </Link>
      <Link to="/whitelist">
        <NavbarLink>Whitelist</NavbarLink>
      </Link>
    </NavbarWrapper>
  );
};

export default Navbar;
