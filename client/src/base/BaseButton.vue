<script lang="ts" setup>
import type { DaisyUIColors, DaisyUISizes } from '@/types/ui.types';


interface BaseButtonProps {
    color: DaisyUIColors,
    disabled?: boolean,
    size?: DaisyUISizes,
    loading?: boolean
}

const { color, disabled, loading, size } = defineProps<BaseButtonProps>()


const buttonClasses = [
    'btn',
    [`btn-${color}`],
    [`btn-${size || "md"}`],
    disabled || loading ? 'opacity-50 cursor-not-allowed' : '',
    loading ? 'relative' : ''
].filter(Boolean).join(' ')



</script>

<template>

    <button :class="buttonClasses" :disabled="disabled || loading">
        <slot></slot>
    </button>
</template>