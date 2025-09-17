<script setup lang="ts">

import type { DaisyUIColors, DaisyUISizes } from '@/types/ui.types';
type InputType = "text" | "password" | "email"

interface InputProps {
    color: DaisyUIColors;
    size?: DaisyUISizes;
    type?: InputType;
    placeholder?: string
    disabled?: boolean;
    label?:string;
}

const { color, placeholder, size, type,label } = defineProps<InputProps>()
const model = defineModel<string>({ default: '' })


const inputClasses = [
    "input",
    [`input-${color}`],
    [`input-${size}`]
].filter(Boolean).join(' ')

</script>

<template>
  <label :class="['input', color ? `input-${color}` : '', size ? `input-${size}` : '']">
    <span v-if="label" class="label">{{ label }}</span>
    <input
      :type="type"
      :placeholder="placeholder"

      :disabled="disabled"
      v-model="model"
    />
  </label>
</template>