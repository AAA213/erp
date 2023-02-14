<template>
  <div>
    <a-button type="primary" @click="showModal"
      >Open Modal with async logic</a-button
    >
    <a-modal
      v-model:visible="visible"
      title="Title"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
    >
      <p>{{ modalText }}</p>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
</script>
<style less></style>
