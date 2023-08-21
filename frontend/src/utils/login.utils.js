export const KEYS = {
	USER: "fms:token",
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
