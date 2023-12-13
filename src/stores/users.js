import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from '@/plugins/axios';

export const useUsersStore = defineStore('users', () => {
	const users = ref([]);
	const isShowMore = ref(true);
	let page = 1;

	const fetchUsers = async () => {
		try {
			const response = await axios.get(`/users?page=${page}&count=6`);
			// console.log(response);
			if (!response.success) {
				throw Error(response.message);
			}
			users.value.push(...response.users);
			console.log(users.value);
			if (response.links.next_url) {
				page += 1;
			} else {
				isShowMore.value = false;
			}
		} catch (err) {
			console.error(err);
		}
	};

	return { users, isShowMore, fetchUsers };
});
