<template>
	<div
		id="sign-up"
		class="user-registration-section"
	>
		<Heading :content="formHeading" />
		<template v-if="!isFormSuccess">
			<div
				class="user-registration-form"
				v-loading="isLoading"
			>
				<el-form
					:model="formData"
					label-position="top"
				>
					<el-form-item>
						<div
							v-show="formData.name != ''"
							class="label"
						>
							Your name
						</div>
						<el-input
							v-model="formData.name"
							placeholder="Your name"
							:class="{
								'input-error': formData.name !== '' && !formValid.name,
							}"
							@input="validate(formData.name, 'name')"
						/>
						<span
							v-if="formData.name != '' && !formValid.name"
							class="error"
						>
							Enter valid name
						</span>
					</el-form-item>

					<el-form-item>
						<div
							class="label"
							v-show="formData.email != ''"
						>
							Email
						</div>
						<el-input
							placeholder="Email"
							v-model="formData.email"
							@input="validate(formData.email, 'email')"
							:class="{
								'input-error': formData.email !== '' && !formValid.email,
							}"
						/>
						<span
							v-if="formData.email != '' && !formValid.email"
							class="error"
						>
							Enter valid email
						</span>
					</el-form-item>
					<el-form-item>
						<div
							class="label"
							v-show="formData.phone != ''"
						>
							Phone
						</div>
						<el-input
							placeholder="Phone"
							v-model="formData.phone"
							@input="validate(formData.phone, 'phone')"
							:class="{
								'input-error': formData.phone !== '' && !formValid.phone,
							}"
						/>
						<span
							v-if="formData.phone != '' && !formValid.phone"
							class="error"
						>
							Enter valid phone
						</span>
						<span class="helper"> +38 (XXX) XXX - XX - XX </span>
					</el-form-item>

					<div class="radio-title">Select your position</div>
					<template v-if="usersPositions">
						<el-radio-group
							v-model="radio"
							class="user-registration-radio-group"
						>
							<el-radio
								v-for="(position, key) in usersPositions"
								:label="position.id"
								:key="key"
								size="large"
								>{{ position.name }}</el-radio
							>
						</el-radio-group>
					</template>

					<div class="photo-uploader-wrap">
						<input
							id="file"
							ref="fileInput"
							class="hide"
							type="file"
							@change="handleFileUpload"
							accept="image/*"
						/>

						<div class="photo-uploader-wrap">
							<div class="photo-uploader">
								<div
									@click="fileClick"
									class="upload-button"
								>
									Upload
								</div>
								<div class="upload-label">{{ fileLabel }}</div>
							</div>
							<span
								v-if="imageError"
								class="error"
							>
								{{ imageError }}
							</span>
						</div>
					</div>

					<Button
						class="form-submit-button"
						:disabled="isFormSubmitComputed"
						text="Sign up"
						@clicked="onButtonClick"
					/>
				</el-form>
			</div>
		</template>

		<template v-if="isFormSuccess">
			<div class="user-registration-success">
				<img
					src="@/assets/images/success-image.svg"
					alt="sucess"
				/>
			</div>
		</template>
	</div>
</template>
<script>
import { reactive, ref, toRefs, computed } from 'vue';
import Heading from '../basic/Heading.vue';

import Button from '../basic/Button.vue';
import { useUsersStore } from '@/stores/users';
export default {
	components: {
		Button,
		Heading,
	},
	setup() {
		const usersStore = useUsersStore();
		usersStore.fetchPositions();
		const usersData = toRefs(usersStore);
		const usersPositions = ref(usersData.positions);

		const formHeadingDefault = ref('Working with POST request');

		const formHeading = computed(() => {
			return usersData.isFormSent.value
				? 'User successfully registered'
				: formHeadingDefault.value;
		});

		const isFormSuccess = computed(() => usersData.isFormSent.value);

		const fileInput = ref(null);
		const formData = reactive({
			name: '',
			phone: '',
			email: '',
		});

		const formValid = reactive({
			name: false,
			phone: false,
			email: false,
			image: false,
		});

		const radio = ref(1);

		const fileName = ref('');
		const filePhoto = ref(null);

		const loading = ref(false);
		const isLoading = computed(() => loading.value);

		const fileLabel = computed(() =>
			fileName.value != '' ? fileName.value : 'Upload your photo'
		);

		const isFormSubmitDisabled = ref(true);

		const isFormSubmitComputed = computed(() => isFormSubmitDisabled.value);

		const nameComp = computed(() => formData.name);

		const onButtonClick = () => {
			console.log(isFormSubmitDisabled);
			if (!isFormSubmitDisabled.value) {
				loading.value = true;
				const data = new FormData();
				data.append('name', nameComp.value);

				data.append('email', formData.email);
				data.append('phone', formData.phone);
				data.append('position_id', radio.value);
				data.append('photo', filePhoto.value);
				const response = usersStore.sendUserFormInfo(data);
				response.then((res) => {
					loading.value = false;
				});
			}
		};

		const validate = (value, type) => {
			switch (type) {
				case 'name':
					validateName(value);
					break;
				case 'phone':
					validatePhone(value);
					break;
				case 'email':
					validateEmail(value);
					break;
				default:
					console.error('Something went wrong');
			}
			isButtonEnable();
		};

		const isButtonEnable = () => {
			console.log(formValid);
			console.log(Object.values(formValid).every((value) => value === true));
			if (Object.values(formValid).every((value) => value === true)) {
				isFormSubmitDisabled.value = false;
			}
		};

		const validateName = (value) => {
			const minLength = 2;
			const maxLength = 60;

			const isValidLength = value.length >= minLength && value.length <= maxLength;
			const containsOnlyLetters = /^[a-zA-Zа-яА-ЯёЁ]+$/.test(value);

			formValid.name = isValidLength && containsOnlyLetters;
		};
		const validatePhone = (value) => {
			formValid.phone = /^\+380\d{9}$/.test(value);
		};
		const validateEmail = (value) => {
			const emailPattern =
				/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
			const minLength = 2;
			const maxLength = 100;

			const isValidLength = value.length >= minLength && value.length <= maxLength;
			const isValidPattern = emailPattern.test(value);

			formValid.email = isValidLength && isValidPattern;
		};

		const fileClick = () => {
			fileInput.value.click();
		};

		const validateImage = (file) => {
			const validImageTypes = ['image/jpeg', 'image/jpg'];
			if (!validImageTypes.includes(file.type)) {
				return { status: 'error', message: 'File format could be JPG/JPEG' };
			}

			const maxSizeInBytes = 5 * 1024 * 1024;
			if (file.size > maxSizeInBytes) {
				return { status: 'error', message: 'File can not be more than 5MB' };
			}

			const image = new Image();
			image.src = URL.createObjectURL(file);

			return new Promise((resolve, reject) => {
				image.onload = () => {
					if (image.width < 70 || image.height < 70) {
						reject({ status: 'error', message: 'Minimal resolution 70x70' });
					} else {
						resolve({ status: 'ok', message: '' });
					}
				};

				image.onerror = () => {
					reject({ status: 'error', message: 'Error uploading image' });
				};
			});
		};
		const imageError = ref('');
		const handleFileUpload = (event) => {
			const file = event.target.files[0];
			let file_name = file.name;
			let validateMessage = '';
			const validImage = validateImage(file);
			if (validImage instanceof Promise) {
				validImage
					.then((message) => {
						validateMessage = message;
						formValid.image = true;
						fileName.value = file_name;
						isButtonEnable();
						filePhoto.value = file;
						console.log(validateMessage);
						imageError.value = '';
					})
					.catch((err) => {
						validateMessage = err;
						imageError.value = validateMessage;
						console.error(validateMessage);
					});
			} else {
				if (validImage.status == 'error') {
					console.error(validImage.message);
					imageError.value = validImage.message;
				} else {
					imageError.value = '';
					console.log(validImage.message);
				}
			}
		};

		return {
			usersPositions,
			formData,
			isFormSubmitDisabled,
			formValid,
			fileInput,
			radio,
			fileLabel,
			isFormSubmitComputed,
			isLoading,
			imageError,
			formHeading,
			isFormSuccess,
			onButtonClick,
			validate,
			validateName,
			validatePhone,
			validateEmail,
			isButtonEnable,
			fileClick,
			handleFileUpload,
		};
	},
};
</script>
<style lang="scss">
.helper,
.error {
	line-height: 14px;
	padding-left: 16px;
	padding-top: 4px;
	display: block;
	width: 100%;
	font-size: 12px;
}
.input-error {
	.el-input__wrapper {
		box-shadow: 0 0 0 1px #cb3d40 !important;
	}
}
.error {
	color: #cb3d40;
}
.helper {
	color: #7e7e7e;
}
.user-registration-radio-group {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}
.radio-title {
	font-size: 16px;
	color: #000;
	line-height: 26px;
	margin-bottom: 11px;
}
.user-registration-radio-group {
	.el-radio.el-radio--large .el-radio__inner {
		border: 1px solid #d0cfcf;
		width: 20px;
		height: 20px;
	}
	.el-radio__input.is-checked .el-radio__inner {
		background: transparent;
		border-color: #00bdd3;
	}
	.el-radio__input.is-checked .el-radio__inner::after {
		width: 10px;
		height: 10px;
		background-color: #00bdd3;
	}
	.el-radio.el-radio--large .el-radio__label {
		font-size: 16px;
		color: #000;
		line-height: 26px;
	}
}
.hide {
	display: none;
}

.photo-uploader {
	display: flex;
	.upload-button {
		max-width: 100%;
		width: 83px;
		height: 54px;
		border: 1px solid #000;
		border-radius: 4px 0px 0px 4px;
		font-size: 16px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}
	.upload-label {
		width: calc(380px - 83px);
		max-width: 100%;
		border: 1px solid #d0cfcf;
		display: flex;
		align-items: center;
		padding-left: 16px;
		font-size: 16px;
		font-weight: 400;
		border-radius: 0 4px 4px 0;
		color: #7e7e7e;
		overflow: hidden;
	}
}

.user-registration-section {
	h1 {
		text-align: center;
		margin-bottom: 50px;
	}
}

.el-input__inner {
	height: 54px;
	border-radius: 30px;
	padding-left: 16px;
	padding-right: 16px;
	font-size: 16px;
}
.el-input__wrapper {
	border-radius: 4px;
	background-color: transparent;
	&.is-focus {
		box-shadow: 0 0 0 1px #dcdfe6 inset;
	}
}
.label {
	font-size: 12px;
	color: #7e7e7e;
	background-color: #f8f8f8;
	position: absolute;
	z-index: 2;
	top: -7px;
	left: 12px;
	padding-left: 3px;
	padding-right: 3px;
	line-height: 1.4;
}
.el-form-item {
	margin-bottom: 50px;
}
.user-registration-form {
	width: 380px;
	max-width: 100%;
	margin: 0 auto 100px;
}
.el-radio-group {
	margin-bottom: 47px;
}
.photo-uploader-wrap {
	margin-bottom: 50px;
}
.form-submit-button {
	margin: 0 auto;
}
.user-registration-success {
	text-align: center;
}
</style>
