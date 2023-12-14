<template>
	<div class="input-wrap">
		<el-input
			v-model="inputModel"
			:placeholder="placeholder"
			@input="onInput"
		/>
		<span >{{ placeholder }}</span>
	</div>
</template>
<script>
import { ref } from 'vue';
export default {
	props: {
		placeholder: {
			type: String,
		},
	},
	setup(props, { emit }) {
		const inputModel = ref('');

		const onInput = (value) => {
			emit('onInputEmit', value);
		};
        

		return { inputModel, onInput };
	},
};
</script>
<style lang="scss"></style>
