<template>
  <nav aria-label="Page navigation">
    <ul class="pagination mb-0">
      <li class="page-item" :class="{'disabled' : !pages.has_pre}">
        <a class="page-link" href="#" @click.prevent="updatePage(pages.current_page - 1)">
          <span class="material-icons h6 mb-0">navigate_before</span>
        </a>
      </li>
      <li class="page-item" v-for="page in pages.total_pages" :key="page" :class="{'active' : pages.current_page===page}">
        <a class="page-link" href="#" @click.prevent="updatePage(page)">{{ page }}</a>
      </li>
      <li class="page-item" :class="{'disabled' : !pages.has_next}">
        <a class="page-link" href="#" @click.prevent="updatePage(pages.current_page + 1)">
          <span class="material-icons h6 mb-0">keyboard_arrow_right</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>

export default {
  props: ['pages'],
  data() {
    return {     
    
    };
  },
  methods: {
    updatePage(page) {
      this.$emit('emitPages', page);
    },
  },
}
</script>
