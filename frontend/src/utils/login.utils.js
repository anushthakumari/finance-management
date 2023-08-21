export const KEYS = {
	USER: "fms:token",
	NAME: "fms:name",
};

export const get_creds = () => {
	return localStorage.getItem(KEYS.USER);
};

export const set_creds = (token = "") => {
	localStorage.setItem(KEYS.USER, token);
};
export const remove_creds = () => {
	localStorage.removeItem(KEYS.USER);
};

export const get_name = () => {
	return localStorage.getItem(KEYS.NAME);
};

export const set_name = (name = "") => {
	localStorage.setItem(KEYS.NAME, name);
};
export const remove_name = () => {
	localStorage.removeItem(KEYS.NAME);
};

export const getAuthHeader = () => {
	const token = get_creds();

	return {
		Authorization: `Bearer ${token}`,
	};
};

export const getHeaders = (headers = {}) => {
	return { headers: { "Content-Type": "application/json", ...headers } };
};

export const getHeaderConfig = () => getHeaders(getAuthHeader());
