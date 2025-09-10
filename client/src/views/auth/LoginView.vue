<script lang="ts" setup>
import BaseButton from '@/base/BaseButton.vue';
import BaseCheckbox from '@/base/BaseCheckbox.vue';
import BaseInput from '@/base/BaseInput.vue';
import { reactive, ref } from 'vue';


const form = reactive({
    email: "",
    password: ""
})

const showPassword = ref(false)

const onSubmit = () => {
    console.log(form)
}

</script>

<template>

    <div class=" flex justify-center items-center h-screen">
        <div class="shadow-lg   rounded-lg">
            <form @submit.prevent="onSubmit" class=" w-96 flex  flex-col justify-center items-center">
                <BaseInput color="primary" v-model="form.email" type="email" placeholder="example@gmail.com" />

                <BaseInput color="primary" v-model="form.password" :type="showPassword ? 'text':'password'" placeholder="******" class="mt-7" />

                <div>
                    <BaseCheckbox title="نمایش کلمه عبور" v-model="showPassword" />
                </div>

                <div class="my-5">
                    <p>
                        حساب کاربری ندارید؟<RouterLink to="/register" class="text-blue-400">ثبت نام</RouterLink>
                    </p>
                </div>

                <div class="pb-5 ">
                    <BaseButton color="neutral" type="submit" class="btn btn-info text-white w-50">ورود</BaseButton>
                </div>
            </form>
        </div>
    </div>
</template>