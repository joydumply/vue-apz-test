<template>
	<div class="user-card">
		<div class="img">
			<img
				:src="userPhoto"
				:alt="user.name"
			/>
		</div>
		<el-tooltip
			class="box-item"
			effect="dark"
			:show-arrow="false"
			:content="user.name"
			placement="bottom"
		>
			<div class="name">
				{{ user.name }}
			</div>
		</el-tooltip>
		<div class="info">
			<el-tooltip
				class="box-item"
				effect="dark"
				:show-arrow="false"
				:content="user.position"
				placement="bottom"
			>
				<div class="position">
					{{ user.position }}
				</div>
			</el-tooltip>
			<el-tooltip
				class="box-item"
				effect="dark"
				:show-arrow="false"
				:content="user.email"
				placement="bottom"
			>
				<a
					href="mailto:{{ user.email }}"
					class="email"
				>
					{{ user.email }}
				</a>
			</el-tooltip>
			<el-tooltip
				class="box-item"
				effect="dark"
				:show-arrow="false"
				:content="user.phone"
				placement="bottom"
			>
				<a
					href="tel:{{ user.phone }}"
					class="phone"
				>
					{{ user.phone }}
				</a>
			</el-tooltip>
		</div>
	</div>
</template>
<script>
import { computed, ref } from 'vue';
export default {
	props: {
		user: {
			type: Object,
		},
	},
	setup(props) {
		const defaultUserPhoto = '/src/assets/images/photo-cover.svg';
		const userPhoto = computed(() => props.user.photo || defaultUserPhoto);
		return {
			userPhoto,
		};
	},
};
</script>
<style lang="scss">
.user-card {
	padding: 20px;
	background-color: #fff;
	border-radius: 10px;
	.img {
		text-align: center;
		margin-bottom: 20px;
		img {
			width: 70px;
			height: 70px;
			border-radius: 50%;
		}
	}
	.name,
	.position,
	.email,
	.phone {
		max-width: 100%;
		overflow: hidden;
		font-size: 16px;
		line-height: 26px;
		color: #000;
		text-decoration: none;
		text-align: center;
	}
	.info {
		display: flex;
		flex-direction: column;
	}
}
</style>
