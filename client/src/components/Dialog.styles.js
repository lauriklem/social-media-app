import styled from "styled-components";
import colors from 'styles/colors';
import { Button } from 'components';

// Styles of the dialog component
export const DialogContainer = styled.dialog`
    border: 3px solid ${colors.gray};
    padding: 0;
    background: ${colors.background};
`;

export const DialogForm = styled.form`

`;

export const DialogTitle = styled.h3`
    margin: 10px;
`;

export const DialogText = styled.p`
    margin: 10px;
`;

export const BtnContainer = styled.div`
    display: flex;
    justify-content: right;
`;

export const DialogButton = styled(Button)`
    margin: 10px;
    padding: 8px;
`;