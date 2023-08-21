import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";
import { dollar } from "../../utils/Icons";
import Chart from "../Chart/Chart";
import BudgetCharts from "./BudgetCharts";

function Dashboard() {
	const {
		totalExpenses,
		getBudgetsOverview,
		budgetOverview,
		totalIncome,
		totalBalance,
		getIncomes,
		getExpenses,
	} = useGlobalContext();

	console.log(budgetOverview);

	useEffect(() => {
		getIncomes();
		getExpenses();
		getBudgetsOverview();
	}, []);

	return (
		<DashboardStyled>
			<InnerLayout>
				<h1>All Transactions</h1>
				<div className="stats-con">
					<div className="chart-con">
						<Chart />
					</div>
					<div className="history-con">
						<div className="amount-con">
							<div className="income">
								<h2>Total Income</h2>
								<p>
									{dollar} {totalIncome()}
								</p>
							</div>
							<div className="expense">
								<h2>Total Expense</h2>
								<p>
									{dollar} {totalExpenses()}
								</p>
							</div>
							<div className="balance">
								<h2>Total Balance</h2>
								<p>
									{dollar} {totalBalance()}
								</p>
							</div>
						</div>
					</div>
				</div>
				<BudgetCharts />
			</InnerLayout>
		</DashboardStyled>
	);
}

const DashboardStyled = styled.div`
	.stats-con {
		display: flex;
		gap: 2rem;
		.chart-con {
			height: 400px;
			flex: 1;
		}

		.history-con {
			flex: 0.5;
			h2 {
				margin: 1rem 0;
				display: flex;
				font-size: 1.6rem;
				align-items: center;
				justify-content: space-between;
			}
			.salary-title {
				font-size: 1.2rem;
				span {
					font-size: 1.8rem;
				}
			}
			.salary-item {
				background: #fcf6f9;
				border: 2px solid #ffffff;
				box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
				padding: 1rem;
				border-radius: 20px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				p {
					font-weight: 600;
					font-size: 1.6rem;
				}
			}
			.amount-con {
				display: flex;
				flex-direction: column;
				gap: 1rem;

				.income,
				.expense {
				}
				.income,
				.expense,
				.balance {
					background: #fcf6f9;
					border: 2px solid #ffffff;
					box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
					border-radius: 20px;
					padding: 1rem;
					p {
						font-size: 1.5rem;
						font-weight: 700;
					}
				}

				.balance {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					p {
						color: var(--color-green);
						opacity: 0.6;
						font-size: 1.5rem;
					}
				}
			}
		}
	}
`;

export default Dashboard;
