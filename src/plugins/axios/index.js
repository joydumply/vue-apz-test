import axios from 'axios';
const instance = axios.create({
	baseURL: import.meta.env.VITE_APP_API_URL,
});

function returnData(res) {
	return res.data;
}

instance.interceptors.response.use(
	(response) => {
		return returnData(response);
	},
	(err) => {
		return Promise.reject(error);
	}
);
export default instance;
