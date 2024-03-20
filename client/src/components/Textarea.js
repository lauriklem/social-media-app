import styled from "styled-components";
import colors from 'styles/colors';

// Styles of the textarea used in the app
export const Textarea = styled.textarea`
    resize: none;
    padding: 12px 8px;
    border: 1px solid ${colors.gray};
    border-radius: 4px;
    margin-bottom: 12px;
    width: 100%;

    &:focus{
        outline: 1px solid ${colors.primary};
    }
`;

export const TextareaWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;