import React, { useEffect } from "react";

import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { dollar } from "../../utils/Icons";

const container = {
	height: 20,
	width: "100%",
	backgroundColor: "#fff",
	borderRadius: 50,
};

const bar = (p) => ({
	height: "100%",
	width: `${p}%`,
	backgroundColor: "#90CAF9",
	borderRadius: "inherit",
});

const label = {
	padding: "1rem",
	color: "#000000",
};

function percentage(partialValue, totalValue) {
	return parseInt((100 * partialValue) / totalValue);
}

function Chart() {
	const { getBudgetsOverview, budgetOverview } = useGlobalContext();

	useEffect(() => {
		getBudgetsOverview();
	}, []);

	return (
		<ChartStyled>
			<h2 style={{ marginBottom: "0.6rem" }}>Budgets</h2>
			{budgetOverview.map((v) => {
				const progress = percentage(v.spent, v.amount);

				const is_budget_exceeded = progress > 100;

				return (
					<IncomeItemStyled>
						<div className="content">
							<h5>
								{v.title} {is_budget_exceeded ? "(Budget exceeded)" : null}
							</h5>
							<div style={{ display: "flex", justifyContent: "space-between" }}>
								<p>
									<span>Spent: </span>
									{dollar}
									{v.spent}
								</p>
								<p>
									<span>Budget: </span>
									{dollar}
									{v.amount}
								</p>
							</div>
							<div style={container}>
								{is_budget_exceeded ? (
									<div
										style={bar(100)}
										role="progressbar"
										aria-valuenow={100}
										aria-valuemin={0}
										aria-valuemax={100}>
										<span style={label}>{`${100}%`}</span>
									</div>
								) : (
									<div
										style={bar(progress)}
										role="progressbar"
										aria-valuenow={progress}
										aria-valuemin={0}
										aria-valuemax={100}>
										<span style={label}>{`${progress}%`}</span>
									</div>
								)}
							</div>
						</div>
					</IncomeItemStyled>
				);
			})}
		</ChartStyled>
	);
}

const ChartStyled = styled.div`
	background: #fcf6f9;
	border: 2px solid #ffffff;
	box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
	padding: 1rem;
	border-radius: 20px;
	margin-top: 20px;
`;

const IncomeItemStyled = styled.div`
	background: #fcf6f9;
	border: 2px solid #ffffff;
	box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
	border-radius: 20px;
	padding: 1rem;
	margin-bottom: 1rem;
	display: flex;
	align-items: center;
	width: 100%;
	color: #222260;

	.content {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		h5 {
			font-size: 1.3rem;
			position: relative;
			margin-bottom: 1rem;
		}
	}
`;

export default Chart;
