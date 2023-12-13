<template>
	<header class="header d-flex justify-content-center align-items-center">
		<div class="container d-flex justify-content-between align-items-center">
			<img
				src="@/assets/images/Logo.svg"
				alt="logo"
				class="logo"
			/>

			<div class="buttons_wrap">
				<Button text="Users" />
				<Button text="Sign up" />
			</div>
		</div>
	</header>
</template>
<script>
import Button from './basic/Button.vue';
export default {
	components: {
		Button,
	},
	setup() {},
};
</script>
<style lang="scss">
.header {
	height: 60px;
	background-color: #fff;
	.logo {
		max-width: 104px;
		max-height: 26px;
	}
}
.buttons_wrap {
	display: flex;
	align-items: center;
	gap: 10px;
}
</style>
