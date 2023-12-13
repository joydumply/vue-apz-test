<template>
	<div
		class="button"
		:class="buttonTypeClass"
	>
		{{ text }}
	</div>
</template>
<script>
import { computed } from 'vue';
export default {
	props: {
		text: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			default: 'yellow',
		},
	},
	setup(props) {
		const buttonTypeClass = computed(() => props.type);

		return { buttonTypeClass };
	},
};
</script>
<style lang="scss">
.button {
	width: 100px;
	height: 34px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 16px;
	color: #000;
	border-radius: 80px;
	cursor: pointer;
	&.yellow {
		background-color: #f4e041;
	}
}
</style>
