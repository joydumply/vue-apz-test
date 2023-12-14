<template>
	<div>
		<Header @onClickAnchor="scrollToAnchor" />
		<div class="container">
			<Hero @onClickAnchor="scrollToAnchor" />
			<UsersList
				:users="usersList"
				:isShowMore="isShowMore"
				:isLoading="isLoading"
				@showMoreClick="onShowMoreClick"
			/>
			<UserRegistrationForm />
		</div>
	</div>
</template>
<script>
import { toRefs, ref } from 'vue';
import { useUsersStore } from '@/stores/users';
import '@/assets/css/base.scss';
import Header from '@/components/Header.vue';
import Hero from './components/Hero.vue';
import UsersList from './components/users/UsersList.vue';
import UserRegistrationForm from './components/users/UserRegistrationForm.vue';
export default {
	components: { Header, Hero, UsersList, UserRegistrationForm },
	setup() {
		const usersStore = useUsersStore();
		usersStore.fetchUsers();

		const usersData = toRefs(usersStore);
		const usersList = ref(usersData.users);
		const isShowMore = ref(usersData.isShowMore);
		const isLoading = ref(false);
		const onShowMoreClick = () => {
			console.log('show more clicked');
			isLoading.value = true;
			const res = usersStore.fetchUsers(true);
			res.then(() => (isLoading.value = false));
		};

		const scrollToAnchor = (anchor) => {
			const elem = document.getElementById(anchor);
			if (elem) {
				elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		};
		return { usersList, isShowMore, isLoading, scrollToAnchor, onShowMoreClick };
	},
};
</script>

<style scoped></style>
