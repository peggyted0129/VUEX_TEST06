<template>
  <div>
    <div class="message-alert">
      <div class="alert alert-dismissible" :class="'alert-' + item.status" v-for="(item, i) in messages" :key="i">
        {{ item.message }}
        <button type="button" class="close" @click="removeMessage(i)" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters('alertModules', ['messages']),
  },
  methods: {
    ...mapActions('alertModules', ['updateMessage', 'removeMessage', 'removeMessageWithTiming']),
  },
  
};
  
</script>

<style scope>

.message-alert {
  position: fixed;
  max-width: 50%;
  top: 80px;
  right: 20px;
  z-index: 2000;
}
</style>
