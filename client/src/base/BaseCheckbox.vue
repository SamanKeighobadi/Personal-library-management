<script setup lang="ts">

type BaseCheckboxProps = {
    title: string;

}

const props = defineProps<BaseCheckboxProps>()
const model = defineModel({ default: false })

</script>


<template>
    <label class="label">
        <input type="checkbox" v-model="model" class="checkbox" />
        {{ props.title }}
    </label>
</template>