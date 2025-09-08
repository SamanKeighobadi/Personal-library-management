<script lang="ts" setup>
import BaseButton from '@/base/BaseButton.vue';


interface BookCardProps {
    image:string;
    title: string;
    publisher: string;
    author: string;
}

const props = defineProps<BookCardProps>()

</script>


<template>

    <div class="card bg-base-100 w-80 shadow-md">
        <figure>
            <img :src="image"
                :alt="props.title" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">{{ props.title }}</h2>
            <p>{{ props.publisher }}</p>
            <p>{{ props.author }}</p>
            <div class="card-actions justify-end">
                <BaseButton color="neutral">مشاهده</BaseButton>
            </div>
        </div>
    </div>
</template>