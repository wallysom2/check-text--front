import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar: React.FC = () => {
	return (
		<NavbarWrapper>
			<Link to="/">
				<NavbarLink>Check</NavbarLink>
			</Link>
			<Link to="/blacklist">
				<NavbarLinkBlacklist>Blacklist</NavbarLinkBlacklist>
			</Link>
			<Link to="/whitelist">
				<NavbarLinkWhitelist>Whitelist</NavbarLinkWhitelist>
			</Link>
		</NavbarWrapper>
	);
};

export default Navbar;

const NavbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 40px 80px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

`;

const NavbarLink = styled.a`
  font-family: 'Poppins', sans-serif;
  font-size: 1.6rem;
  color: #2d3748;
  text-decoration: none;
  margin-right: 1rem;
  padding: 0.5rem 1rem;
  transition: all 0.3s;

  &:hover {
    color: #0c7cd5;
  }
`;

const NavbarLinkBlacklist = styled(NavbarLink)`
  &:hover {
    color: #aaa;
  }
`;

const NavbarLinkWhitelist = styled(NavbarLink)`
  &:hover {
    color: darkgreen;
  }
`;
