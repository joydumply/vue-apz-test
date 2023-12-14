<template>
	<div
		id="users"
		class="users-list-wrap"
	>
		<Heading
			class="users-list-heading"
			content="Working with GET request"
		/>

		<template v-if="usersList">
			<div
				class="users-list"
				v-loading="loading"
			>
				<UserItem
					class="user-item"
					v-for="(user, key) in usersList"
					:user="user"
					:key="key"
				/>
			</div>

			<Button
				v-if="isShowMore"
				class="btn-show-more"
				text="Show more"
				@click="onShowMoreClick"
			/>
		</template>
	</div>
</template>
<script>
import { computed, ref } from 'vue';
import Heading from '../basic/Heading.vue';
import UserItem from './UserItem.vue';
import Button from '../basic/Button.vue';
export default {
	components: {
		Heading,
		UserItem,
		Button,
	},
	props: {
		users: {
			type: Array,
			required: true,
		},
		isShowMore: {
			type: Boolean,
		},
		isLoading: {
			type: Boolean,
			default: false,
		},
	},
	setup(props, { emit }) {
		const usersList = computed(() => props.users || null);

		const loading = computed(() => props.isLoading);

		const onShowMoreClick = () => {
			emit('showMoreClick');
		};

		return { usersList, loading, onShowMoreClick };
	},
};
</script>
<style lang="scss">
.users-list-heading {
	margin-bottom: 50px;
	text-align: center;
}

.users-list {
	display: flex;
	flex-wrap: wrap;
	gap: 29px;
	margin-bottom: 50px;
	@media (min-width: 1024px) {
		padding-left: 60px;
		padding-right: 60px;
	}
	@media (min-width: 768px) {
		padding-left: 32px;
		padding-right: 32px;
		gap: 16px;
		justify-content: space-between;
	}
	@media (min-width: 320px) {
		justify-content: center;
	}

	.user-item {
		width: 370px;
		max-width: 100%;
		@media (min-width: 1024px) {
			width: 282px;
		}
		@media (min-width: 768px) {
			width: 344px;
		}
		@media (min-width: 320px) {
			width: 328px;
		}
	}
}
.btn-show-more {
	width: 120px;
	margin-left: auto;
	margin-right: auto;
}
.users-list-wrap {
	margin-bottom: 140px;
}
</style>
