<script setup lang="ts">
import BookCard from '@/components/books/BookCard.vue';

const books = [
  {
    id: 1,
    author: "داستویوفسکی", publisher: "مرکز", title: "برادران کارامازوف",
    image: "https://dkstatics-public.digikala.com/digikala-products/39dc6424eb3f058abe3923fc835446013622c3e8_1660736596.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90"
  }, {
    id: 2,
    image: "https://dkstatics-public.digikala.com/digikala-products/696660.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
    title: "تاریخ جهان",
    publisher: "ققنوس",
    author: "فلیمچه فرناندس"
  },
  {
    id: 3,
    author: "داستویوفسکی", publisher: "مرکز", title: "برادران کارامازوف",
    image: "https://dkstatics-public.digikala.com/digikala-products/39dc6424eb3f058abe3923fc835446013622c3e8_1660736596.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90"
  }, {
    id: 4,
    image: "https://dkstatics-public.digikala.com/digikala-products/696660.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
    title: "تاریخ جهان",
    publisher: "ققنوس",
    author: "فلیمچه فرناندس"
  },
]

</script>

<template>
  <main>


    <div class="grid grid-cols-4">
      <BookCard v-for="value in books" :author="value.author" :title="value.title" :publisher="value.publisher"
        :image="value.image" :key="value.id" />
    </div>
  </main>
</template>
