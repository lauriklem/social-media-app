import styled from 'styled-components';
import colors from 'styles/colors';

// Styles of the main "wrappers" of the app
export const MainContent = styled.div`
    max-width: 900px;
    display: grid;
    margin: 0 auto;
    width: 100%;
    padding: 0 10px;
    background: ${colors.background};
`;

export const SideBySide = styled.div`
    display: flex;
`;

// Background fills entire screen
export const Background = styled.div`
    background: ${colors.background};
    height: 100vh;
`;