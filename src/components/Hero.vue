<template>
	<div class="hero d-flex justify-content-center align-items-center">
		<div class="hero-content">
			<Heading
				type="h1"
				content="Test assignment for front-end developer"
				class="hero-heading"
			/>
			<Text
				content="What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving."
				class="hero-text"
			/>
			<Button
				@click="clickAnchor('sign-up')"
				class="hero-btn"
				text="Sign up"
			/>
		</div>
	</div>
</template>
<script>
import Heading from './basic/Heading.vue';
import Text from './basic/Text.vue';
import Button from './basic/Button.vue';
export default {
	components: {
		Heading,
		Text,
		Button,
	},
	props: {},
	setup(props, { emit }) {
		const clickAnchor = (anchor) => {
			emit('onClickAnchor', anchor);
		};
		return { clickAnchor };
	},
};
</script>
<style lang="scss">
.hero {
	background-image: url('@/assets/images/hero.jpeg');
	background-size: cover;
	background-position: center bottom;
	width: 100%;
	height: 650px;
	position: relative;
	margin-bottom: 140px;
	&:after {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
	}
	* {
		z-index: 2;
	}
}
.hero-content {
	width: 100%;
	max-width: 380px;
	margin: 0 auto;
}
.hero-heading {
	text-align: center;
	margin-bottom: 21px;
	color: #fff;
}
.hero-text {
	color: #fff;
	text-align: center;
	margin-bottom: 32px;
}
.hero-btn {
	margin: 0 auto;
}
</style>
