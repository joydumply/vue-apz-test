import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from '@/plugins/axios';

export const useUsersStore = defineStore('users', () => {
	const users = ref([]);
	const positions = ref([]);
	const isShowMore = ref(true);
	const isFormSent = ref(false);
	let page = 1;

	const fetchUsers = async (showMore = false) => {
		const result = { status: '', message: '' };
		try {
			if (!showMore) {
				page = 1;
			}
			const response = await axios.get(`/users?page=${page}&count=6`);
			page += 1;
			if (!response.success) {
				throw Error(response.message);
			}
			if (showMore) {
				users.value.push(...response.users);
				if (!response.links.next_url) {
					isShowMore.value = false;
				}
			} else {
				users.value = response.users;
			}

			result.status = 'success';
			result.message = 'success';
		} catch (err) {
			console.error(err);
			result.status = 'error';
			result.message = err;
		} finally {
			return result;
		}
	};

	const fetchPositions = async () => {
		try {
			const response = await axios.get('/positions');
			if (!response.success) {
				throw Error(response.message);
			}
			positions.value = response.positions;
		} catch (err) {
			console.error(err);
		}
	};

	const sendUserFormInfo = async (formData = null) => {
		if (formData) {
			const token = await axios.get('/token');
			if (token.success) {
				axios
					.post('/users', formData, {
						headers: {
							Token: token.token,
						},
					})
					.then((response) => {
						fetchUsers();
						isFormSent.value = true;
						return { status: 'success', response };
					})
					.catch((err) => {
						console.error(err);
						return { status: 'error', response: err };
					});
			}
		}
	};

	return {
		users,
		positions,
		isShowMore,
		isFormSent,
		fetchUsers,
		fetchPositions,
		sendUserFormInfo,
	};
});
