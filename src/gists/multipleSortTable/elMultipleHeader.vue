<template>
  <div
    style="cursort:pointer"
    @click="multipleSortChange"
  >
    <slot>What's Key</slot>
    <span class="caret-wrapper">
      <i
        v-if="onlyDesc === false"
        class="sort-caret ascending"
      />
      <i
        v-if="onlyAsc === false"
        class="sort-caret descending"
      />
    </span>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'ElMultipleHeader',
  props: {
    onlyAsc: {
      type: Boolean,
      default: false,
    },
    onlyDesc: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    multipleSortChange(event) {
      this.$emit('multiple-sort-change', event);
    },
  },
});
</script>

<style>
.active-asc .sort-caret.ascending {
  /* 按钮主题色 */
  border-bottom-color: #409EFF;
}
.active-desc .sort-caret.descending {
  /* 按钮主题色 */
  border-top-color: #409EFF;
}

/* // 依赖禁用到el-table的箭头样式 */
.is-sortable > .cell > .caret-wrapper {
  display: none;
}
.active-desc.ascending .sort-caret.ascending {
  border-bottom-color: #C0C4CC !important;
}
.active-asc.descending .sort-caret.descending {
  border-top-color: #C0C4CC !important;
}
/* // 只有asc */
.active-null.ascending .sort-caret.ascending {
  border-bottom-color: #C0C4CC !important;
}
/* // 只有desc */
.active-null.descending .sort-caret.descending {
  border-top-color: #C0C4CC !important;
}
</style>
