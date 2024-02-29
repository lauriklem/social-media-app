import styled from 'styled-components';
import { Button } from 'components';
import colors from 'styles/colors';

export const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 400px;
    width: 100%;
    margin: 0 auto;
`;

export const InfoLabel = styled.label`
    white-space: pre-wrap;
    color: ${colors.secondary};
    padding-bottom: 16px;
`;

export const CenteredText = styled.label`
    text-align: center;
`;

export const FormButton = styled(Button)`

`;

export const CheckboxWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-top: 8px;
    margin-bottom: 8px;
`;