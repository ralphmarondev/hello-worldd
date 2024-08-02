<script>
  export default {
    name: 'PostContainer',
    props: {
      description: {
        type: String,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
    },
  };
</script>

<template>
  <div class="post-container">
    <div class="post-content">
      <p>{{ description }}</p>
      <span class="post-date">{{ date }}</span>
    </div>
  </div>
</template>

<style scoped>
  .post-container {
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 10px;
    background: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .post-content {
    /* Add styles to ensure uniformity */
    min-width: 500px;
  }

  .post-date {
    display: block;
    margin-top: 10px;
    font-size: 0.9em;
    color: #666;
  }
</style>
