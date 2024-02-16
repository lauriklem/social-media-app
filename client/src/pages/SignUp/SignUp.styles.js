import styled from 'styled-components';
import { Button } from 'components';

export const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 900px;
    margin: 0 auto;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 400px;
`;

export const InfoLabel = styled.label`
    white-space: pre-wrap;
    color: red;
    padding-bottom: 16px;
`;

export const FormButton = styled(Button)`
    margin: 0 auto 0 0;
`;