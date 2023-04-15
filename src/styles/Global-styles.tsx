import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    ${reset}
    * {
        box-sizing: border-box;
    }
    body {
        font-family: 'Noto Sans KR', sans-serif;
        font-size: 14px;
        background-color: #E6F5FF;
    }
    a {
        text-decoration: none;
    }
    
`;

export default GlobalStyles;
