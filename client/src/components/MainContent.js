import styled from 'styled-components';
import colors from 'styles/colors';

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

export const Background = styled.div`
    background: ${colors.background};
    height: 100vh;
`;