import React, { useState } from "react";
import styled from "styled-components";

import { useGlobalContext } from "../../context/globalContext";
import { set_creds, set_name } from "../../utils/login.utils";

const Index = ({ setActive }) => {
	const { login } = useGlobalContext();
	const [isLoading, setisLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setisLoading(true);
			const email = e.currentTarget.email.value.trim();
			const pass = e.currentTarget.pass.value.trim();

			const { data } = await login(email, pass);
			set_creds(data.token);
			set_name(data.name);
			setActive(1);
		} catch (error) {
			console.log(error);
			if (error.response) {
				alert(error.response.data.message);
			} else {
				alert("Something went wrong!");
			}
		} finally {
			setisLoading(false);
		}
	};

	const handleRegisterClick = () => {
		setActive(-1);
	};

	return (
		<ContainerStyled>
			<center>
				<h1>Finance Management System</h1>
			</center>
			<FormStyled onSubmit={handleSubmit}>
				<center>
					<h3>Hii, Welcome back!!</h3>
					<img
						src="https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png"
						alt="Avatar"
						width={"100"}
						height={"100"}
					/>
				</center>

				<div className="input-control">
					<input type="email" name={"email"} placeholder="Email" required />
				</div>
				<div className="input-control">
					<input
						name="pass"
						type="password"
						placeholder={"Password"}
						minLength={6}
						maxLength={12}
						required
					/>
				</div>
				<button type="submit" disabled={isLoading}>
					{isLoading ? "Loading.." : "Login"}
				</button>
				<p onClick={handleRegisterClick}>
					Don't have an account? register here.
				</p>
			</FormStyled>
		</ContainerStyled>
	);
};

export default Index;

const ContainerStyled = styled.nav`
	padding: 2rem 1.5rem;
	width: 100%;
	height: 100%;
	background: rgba(252, 246, 249, 0.78);
	border: 3px solid #ffffff;
	backdrop-filter: blur(4.5px);
	border-radius: 32px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 2rem;
`;

const FormStyled = styled.form`
	width: 450px;
	display: flex;
	flex-direction: column;
	gap: 2rem;

	input,
	textarea,
	displa select {
		font-family: inherit;
		font-size: inherit;
		outline: none;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 5px;
		border: 2px solid #fff;
		background: transparent;
		resize: none;
		box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
		color: rgba(34, 34, 96, 0.9);
		&::placeholder {
			color: rgba(34, 34, 96, 0.4);
		}
	}
	.input-control {
		input {
			width: 100%;
		}
	}

	button {
		outline: none;
		border: none;
		color: white;
		text-align: center;
		padding: 0.8rem 1.6rem;
		border-radius: 30px;
		background-color: var(--color-accent);
		font-family: inherit;
		font-size: inherit;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		cursor: pointer;
		transition: all 0.4s ease-in-out;
	}

	p {
		cursor: pointer;
	}

	p:hover {
		text-decoration: underline;
	}
`;
