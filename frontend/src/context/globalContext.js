import React, { useContext, useState } from "react";
import axios from "axios";

import { getHeaderConfig } from "../utils/login.utils";

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
	const [incomes, setIncomes] = useState([]);
	const [expenses, setExpenses] = useState([]);
	const [allCategories, setallCategories] = useState([]);
	const [allbudgets, setallbudgets] = useState([]);
	const [budgetOverview, setbudgetOverview] = useState([]);
	const [error, setError] = useState(null);

	//calculate incomes
	const addIncome = async (income) => {
		const response = await axios
			.post(`${BASE_URL}add-income`, income, getHeaderConfig())
			.catch((err) => {
				setError(err.response.data.message);
			});
		getIncomes();
	};

	const register = async (email, name, pass) => {
		return await axios.post(`${BASE_URL}register`, { email, name, pass });
	};

	const login = async (email, pass) => {
		return await axios.post(`${BASE_URL}login`, { email, pass });
	};

	const getIncomes = async () => {
		const response = await axios.get(
			`${BASE_URL}get-incomes`,
			getHeaderConfig()
		);
		setIncomes(response.data);
		console.log(response.data);
	};

	const deleteIncome = async (id) => {
		const res = await axios.delete(
			`${BASE_URL}delete-income/${id}`,
			getHeaderConfig()
		);
		getIncomes();
	};

	const totalIncome = () => {
		let totalIncome = 0;
		incomes.forEach((income) => {
			totalIncome = totalIncome + income.amount;
		});

		return totalIncome;
	};

	//calculate incomes
	const addExpense = async (income) => {
		const response = await axios
			.post(`${BASE_URL}add-expense`, income, getHeaderConfig())
			.catch((err) => {
				setError(err.response.data.message);
			});
		getExpenses();
	};

	const getExpenses = async () => {
		const response = await axios.get(
			`${BASE_URL}get-expenses`,
			getHeaderConfig()
		);
		setExpenses(response.data);
		console.log(response.data);
	};

	const deleteExpense = async (id) => {
		const res = await axios.delete(
			`${BASE_URL}delete-expense/${id}`,
			getHeaderConfig()
		);
		getExpenses();
	};

	const addCategory = async (income) => {
		const response = await axios
			.post(`${BASE_URL}add-cat`, income, getHeaderConfig())
			.catch((err) => {
				setError(err.response.data.message);
			});
		getCategories();
	};

	const getCategories = async () => {
		const response = await axios.get(`${BASE_URL}get-cat`, getHeaderConfig());
		setallCategories(response.data);
	};

	const deleteCategory = async (id) => {
		const res = await axios.delete(
			`${BASE_URL}delete-cat/${id}`,
			getHeaderConfig()
		);
		getCategories();
	};
	const addBudgets = async (income) => {
		const response = await axios
			.post(`${BASE_URL}add-budgets`, income, getHeaderConfig())
			.catch((err) => {
				setError(err.response.data.message);
			});
		getBudgets();
	};

	const getBudgetsOverview = async (income) => {
		const response = await axios
			.get(`${BASE_URL}get-budgets-overview`, getHeaderConfig())
			.catch((err) => {
				setError(err.response.data.message);
			});
		setbudgetOverview(response.data);
	};

	const getBudgets = async () => {
		const response = await axios.get(
			`${BASE_URL}get-budgets`,
			getHeaderConfig()
		);
		setallbudgets(response.data);
	};

	const deleteBudgets = async (id) => {
		const res = await axios.delete(
			`${BASE_URL}delete-budgets/${id}`,
			getHeaderConfig()
		);
		getBudgets();
	};

	const totalExpenses = () => {
		let totalIncome = 0;
		expenses.forEach((income) => {
			totalIncome = totalIncome + income.amount;
		});

		return totalIncome;
	};

	const totalBalance = () => {
		return totalIncome() - totalExpenses();
	};

	const transactionHistory = () => {
		const history = [...incomes, ...expenses];
		history.sort((a, b) => {
			return new Date(b.createdAt) - new Date(a.createdAt);
		});

		return history;
	};

	return (
		<GlobalContext.Provider
			value={{
				register,
				login,
				allbudgets,
				addBudgets,
				getBudgets,
				deleteBudgets,
				getBudgetsOverview,
				budgetOverview,
				addCategory,
				deleteCategory,
				getCategories,
				allCategories,
				addIncome,
				getIncomes,
				incomes,
				deleteIncome,
				expenses,
				totalIncome,
				addExpense,
				getExpenses,
				deleteExpense,
				totalExpenses,
				totalBalance,
				transactionHistory,
				error,
				setError,
			}}>
			{children}
		</GlobalContext.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(GlobalContext);
};
