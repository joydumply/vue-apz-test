<template>
	<component :is="type">{{ content }}</component>
</template>
<script>
export default {
	props: {
		type: {
			type: String,
			default: 'h1',
			validator: (value) => ['h1', 'h2', 'h3', 'h4'].includes(value),
		},
		content: {
			type: String,
			default: 'Heading Text',
		},
	},
};
</script>
<style lang="scss">
h1,
h2,
h3,
h4,
h5 {
	margin-top: 0;
}
h1 {
	font-size: 40px;
	line-height: 40px;
	font-weight: 400;
}
</style>
