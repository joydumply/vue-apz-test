<template>
	<div
		class="button"
		:class="buttonTypeClass"
		:disabled="isDisabled"
		@click="onClick"
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
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	setup(props, { emit }) {
		const buttonTypeClass = computed(() => props.type);
		const isDisabled = computed(() => props.disabled);

		const onClick = () => {
			emit('clicked', isDisabled.value);
		};

		return { buttonTypeClass, isDisabled, onClick };
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
	transition: all linear 0.4s;
	&.yellow {
		background-color: #f4e041;
		&:hover {
			background-color: #ffe302;
		}
	}
	&[disabled='true'] {
		background: #b4b4b4 !important;
		color: #fff !important;
		cursor: not-allowed;
	}
}
</style>
