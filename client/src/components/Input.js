import styled from "styled-components";
import colors from "styles/colors";

// Styles of the input fields used in the app
export const Input = styled.input`
    padding: 12px 8px;
    border: 1px solid ${colors.gray};
    border-radius: 4px;
    margin-bottom: 12px;

    &:focus{
        outline: 1px solid ${colors.primary};
    }
    
    &[type='checkbox']{
        margin: 0 10px 0 0;
        cursor: pointer;
        accent-color: ${colors.primary};
        border-radius: 0;

        &:focus{
        outline: none;
    }
    }
`;

export const InputLabel = styled.label`
    margin-bottom: 8px;
    margin-top: 8px;
`;