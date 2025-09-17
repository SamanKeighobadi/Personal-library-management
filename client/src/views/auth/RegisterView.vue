<script lang="ts" setup>
import BaseButton from '@/base/BaseButton.vue';
import BaseCheckbox from '@/base/BaseCheckbox.vue';
import BaseInput from '@/base/BaseInput.vue';
import { register } from '@/services/auth.services';

import { computed, ref } from 'vue';


import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { registerSchema } from '@/validations/auth.schemas';
import type { RegisterBody } from '@/types/auth.types';

const showPassword = ref(false)

const errorStyleClasses = computed(() => "text-red-600 text-sm")


const { handleSubmit ,isSubmitting} = useForm({
    validationSchema: toTypedSchema(registerSchema),

})


const { value: email, errorMessage: emailError } = useField<string>('email')
const { value: firstName, errorMessage: firstNameError } = useField<string>('firstName')
const { value: lastName, errorMessage: lastNameError } = useField<string>('lastName')
const { value: password, errorMessage: passwordError } = useField<string>('password')
const { value: confirmPassword, errorMessage: confirmPasswordError } = useField<string>('confirmPassword')



const onSubmit = handleSubmit((formValues) => {
    console.log('Form submitted:', formValues)
    const { email, password, firstName, lastName } = formValues

    const data: RegisterBody = {
        email, password, firstName, lastName
    }

    register(data)

})

</script>


<template>

    <div class=" flex justify-center items-center h-screen">
        <div class="shadow-lg   rounded-lg">
            <form @submit="onSubmit" class=" w-96 flex  flex-col justify-center items-center">
                <BaseInput color="primary" v-model="email" type="email" placeholder="example@gmail.com" label="Email" />
                <span v-if="emailError" :class="errorStyleClasses">{{ emailError }}</span>


                <BaseInput color="primary" v-model="firstName" type="text" class="my-4" label="First Name" />
                <span v-if="firstNameError" :class="errorStyleClasses">{{ firstNameError }}</span>
                <BaseInput color="primary" v-model="lastName" type="text" label="Last Name" />
                <span v-if="lastNameError" :class="errorStyleClasses">{{ lastNameError }}</span>

                <BaseInput color="primary" v-model="password" :type="showPassword ? 'text' : 'password'"
                    placeholder="******" class="mt-4" label="Password" />
                <span v-if="passwordError" :class="errorStyleClasses">{{ passwordError }}</span>
                <BaseInput color="primary" v-model="confirmPassword" :type="showPassword ? 'text' : 'password'"
                    class="mt-4" label="Confirm Password" />
                <span v-if="confirmPasswordError" :class="errorStyleClasses">{{ confirmPasswordError }}</span>

                <div>
                    <BaseCheckbox title="نمایش کلمه عبور" v-model="showPassword" />
                </div>

                <div class="my-5">
                    <p>
                        حساب کاربری دارید؟<RouterLink to="/login" class="text-blue-400">وارد شوید</RouterLink>
                    </p>
                </div>

                <div class="pb-5 ">
                    <BaseButton color="neutral" :loading="isSubmitting" type="submit" class="btn btn-info text-white w-50">ثبت نام</BaseButton>
                </div>
            </form>
        </div>
    </div>
</template>
