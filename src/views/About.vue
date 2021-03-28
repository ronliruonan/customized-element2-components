<template>
  <div class="about">
    <h1>This is an about page</h1>
    <MultipleSortTable />
  </div>
</template>

<script>
import MultipleSortTable from '@/gists/multipleSortTable/index.vue';

export default {
  name: 'About',
  components: {
    MultipleSortTable,
  },
};
</script>
