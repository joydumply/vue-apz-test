<template>
	<p>{{ content }}</p>
</template>
<script>
export default {
	props: {
		content: {
			required: true,
		},
	},
	setup(props) {},
};
</script>
<style lang="scss">
    p{
        font-size: 16px;
        line-height: 26px;
    }
</style>
