<script lang="ts" setup>
import BaseButton from '@/base/BaseButton.vue';
import BaseCheckbox from '@/base/BaseCheckbox.vue';
import BaseInput from '@/base/BaseInput.vue';
import { login } from '@/services/auth.services';
import { loginSchema } from '@/validations/auth.schemas';
import { toTypedSchema } from '@vee-validate/zod';
import { useField, useForm } from 'vee-validate';
import { computed, ref } from 'vue';




const showPassword = ref(false)
const errorStyleClasses = computed(() => "text-red-600 text-sm")

const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(loginSchema)
})


const { value: email, errorMessage: emailError } = useField<string>("email")
const { value: password, errorMessage: passwordError } = useField<string>("password")


const onSubmit = handleSubmit(values => {
    login(values)
})

</script>

<template>

    <div class=" flex justify-center items-center h-screen">
        <div class="shadow-lg   rounded-lg">
            <form @submit.prevent="onSubmit" class=" w-96 flex  flex-col justify-center items-center">
                <BaseInput color="primary" v-model="email" type="email" placeholder="example@gmail.com" label="Email" />
                <span v-if="emailError" :class="errorStyleClasses">{{ emailError }}</span>

                <BaseInput color="primary" v-model="password" :type="showPassword ? 'text' : 'password'"
                    placeholder="******" class="mt-7" label="Password" />
                <span v-if="passwordError" :class="errorStyleClasses">{{ emailError }}</span>

                <div>
                    <BaseCheckbox title="نمایش کلمه عبور" v-model="showPassword" />
                </div>

                <div class="my-5">
                    <p>
                        حساب کاربری ندارید؟<RouterLink to="/register" class="text-blue-400">ثبت نام</RouterLink>
                    </p>
                </div>

                <div class="pb-5 ">
                    <BaseButton color="neutral" :loading="isSubmitting" type="submit"
                        class="btn btn-info text-white w-50">ورود</BaseButton>
                </div>
            </form>
        </div>
    </div>
</template>