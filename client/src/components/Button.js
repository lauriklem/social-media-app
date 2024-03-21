import styled from "styled-components";
import colors from 'styles/colors';

// Styles of the buttons used in the app
export const Button = styled.button`
	padding: 16px;
	font-size: large;
	margin: 0 0 8px 0;
	background: ${colors.primary};
	color: ${colors.background};
	border-radius: 4px;
	max-width: 400px;
	width: 100%;

	&:hover{
		opacity: 0.8;
	}

	&:disabled{
		opacity: 0.4;
		cursor: default;
	}
`;

export const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	gap: 16px;
`;

export const SmallButton = styled(Button)`
	max-width: 100px;
	font-size: medium;
	padding: 8px;
	flex-shrink: 0;
`;