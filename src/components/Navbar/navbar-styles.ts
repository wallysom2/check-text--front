import styled from 'styled-components';

const NavbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const NavbarLink = styled.a`
  font-size: 18px;
  color: #555;
  text-decoration: none;
  margin-right: 20px;
  transition: all 0.3s;
  &:hover {
    color: #0c7cd5;
  }
`;

export { NavbarWrapper, NavbarLink };