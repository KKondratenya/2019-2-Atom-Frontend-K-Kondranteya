import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

const year = new Date().getFullYear();

const rotate360 = keyframes`
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
`;

const TopBar = styled.div`
	background-color: #222;
	height: 150px;
	padding: 20px;
	color: #fff;
`;

function Header() {
	return (
		<TopBar>
			<h2>Atom Mail.Ru, {year}</h2>
		</TopBar>
	);
}

export default Header;
