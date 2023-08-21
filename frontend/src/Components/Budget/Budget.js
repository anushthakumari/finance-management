import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";
import { dateFormat } from "../../utils/dateFormat";
import Button from "../Button/Button";
import { plus, trash, dollar, calender, circle } from "../../utils/Icons";

function Budget() {
	const {
		error,
		allCategories,
		getCategories,
		allbudgets,
		addBudgets,
		getBudgets,
		deleteBudgets,
	} = useGlobalContext();
	const [isLoading, setisLoading] = useState(false);

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			setisLoading(true);
			const title = e.currentTarget.title.value.trim();
			const amount = e.currentTarget.amount.value.trim();
			const category = e.currentTarget.category.value.trim();

			await addBudgets({ title, amount, category });
		} catch (error) {
			console.log(error);
		} finally {
			setisLoading(false);
		}
	};

	useEffect(() => {
		getCategories();
		getBudgets();
	}, []);
	return (
		<IncomeStyled>
			<InnerLayout>
				<h1>Budgets</h1>
				<div className="income-content">
					<div className="form-container">
						<FormStyled onSubmit={handleSubmit}>
							{error && <p className="error">{error}</p>}
							<div className="input-control">
								<input
									type="text"
									name={"title"}
									placeholder="Budget Title"
									minLength={5}
									required
								/>
							</div>
							<div className="input-control">
								<input
									type="number"
									name={"amount"}
									placeholder={"Amount"}
									min={1}
									required
								/>
							</div>

							<select required name="category" id="category">
								<option value="" disabled>
									Select Option
								</option>
								{allCategories.map((v) => (
									<option value={v._id}>{v.title}</option>
								))}
							</select>

							<div className="submit-btn">
								<Button
									type="submit"
									name={isLoading ? "Loading.." : "Add Budget"}
									icon={plus}
									bPad={".8rem 1.6rem"}
									bRad={"30px"}
									bg={"var(--color-accent"}
									color={"#fff"}
									disabled={isLoading}
								/>
							</div>
						</FormStyled>
					</div>
					<div className="incomes">
						{allbudgets.map((income) => {
							const { _id, title, amount, date, category } = income;
							return (
								<IncomeItemStyled indicator={"red"}>
									<div className="content">
										<h5>{title}</h5>
										<div className="inner-content">
											<div className="text">
												<p>
													{dollar} {amount}
												</p>
												<p>
													{calender} {dateFormat(date)}
												</p>
												<p>
													{circle} {category.title}
												</p>
											</div>
											<div className="btn-con">
												<Button
													icon={trash}
													bPad={"1rem"}
													bRad={"50%"}
													bg={"var(--primary-color"}
													color={"#fff"}
													iColor={"#fff"}
													hColor={"var(--color-green)"}
													onClick={() => deleteBudgets(_id)}
												/>
											</div>
										</div>
									</div>
								</IncomeItemStyled>
							);
						})}
					</div>
				</div>
			</InnerLayout>
		</IncomeStyled>
	);
}

const IncomeStyled = styled.div`
	display: flex;
	overflow: auto;
	.total-income {
		display: flex;
		justify-content: center;
		align-items: center;
		background: #fcf6f9;
		border: 2px solid #ffffff;
		box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
		border-radius: 20px;
		padding: 1rem;
		margin: 1rem 0;
		font-size: 2rem;
		gap: 0.5rem;
		span {
			font-size: 2.5rem;
			font-weight: 800;
			color: var(--color-green);
		}
	}
	.income-content {
		display: flex;
		gap: 2rem;
		.incomes {
			flex: 1;
		}
	}
`;

const FormStyled = styled.form`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	input,
	textarea,
	select {
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

	.selects {
		display: flex;
		justify-content: flex-end;
		select {
			color: rgba(34, 34, 96, 0.4);
			&:focus,
			&:active {
				color: rgba(34, 34, 96, 1);
			}
		}
	}

	.submit-btn {
		button {
			box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
			&:hover {
				background: var(--color-green) !important;
			}
		}
	}
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
	gap: 1rem;
	width: 100%;
	color: #222260;
	.icon {
		width: 80px;
		height: 80px;
		border-radius: 20px;
		background: #f5f5f5;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2px solid #ffffff;
		i {
			font-size: 2.6rem;
		}
	}

	.content {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		h5 {
			font-size: 1.3rem;
			padding-left: 2rem;
			position: relative;
			&::before {
				content: "";
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				width: 0.8rem;
				height: 0.8rem;
				border-radius: 50%;
				background: ${(props) => props.indicator};
			}
		}

		.inner-content {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.text {
				display: flex;
				align-items: center;
				gap: 1.5rem;
				p {
					display: flex;
					align-items: center;
					gap: 0.5rem;
					color: var(--primary-color);
					opacity: 0.8;
				}
			}
		}
	}
`;

export default Budget;
