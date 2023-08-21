import React, { useState, useMemo } from "react";
import styled from "styled-components";
import bg from "./img/bg.png";
import { MainLayout } from "./styles/Layouts";
import Orb from "./Components/Orb/Orb";
import Navigation from "./Components/Navigation/Navigation";
import Dashboard from "./Components/Dashboard/Dashboard";
import Income from "./Components/Income/Income";
import Expenses from "./Components/Expenses/Expenses";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Category from "./Components/Category/Category";
import Budget from "./Components/Budget/Budget";
import History from "./History/History";

import { get_creds } from "./utils/login.utils";

function App() {
	const token = get_creds();

	const [active, setActive] = useState(token ? 1 : 0);

	const displayData = () => {
		switch (active) {
			case 1:
				return <Dashboard />;
			case 2:
				return <History />;
			case 3:
				return <Income />;
			case 4:
				return <Expenses />;
			case 5:
				return <Category />;
			case 6:
				return <Budget />;

			default:
				return <Dashboard />;
		}
	};

	const orbMemo = useMemo(() => {
		return <Orb />;
	}, []);

	return (
		<AppStyled bg={bg} className="App">
			{orbMemo}
			<MainLayout>
				{active === -1 ? (
					<Register setActive={setActive} />
				) : active === 0 ? (
					<Login setActive={setActive} />
				) : null}
				{active > 0 ? (
					<React.Fragment>
						<Navigation active={active} setActive={setActive} />
						<main>{displayData()}</main>
					</React.Fragment>
				) : null}
			</MainLayout>
		</AppStyled>
	);
}

const AppStyled = styled.div`
	height: 100vh;
	background-image: url(${(props) => props.bg});
	position: relative;
	main {
		flex: 1;
		background: rgba(252, 246, 249, 0.78);
		border: 3px solid #ffffff;
		backdrop-filter: blur(4.5px);
		border-radius: 32px;
		overflow-x: hidden;
		&::-webkit-scrollbar {
			width: 0;
		}
	}
`;

export default App;
