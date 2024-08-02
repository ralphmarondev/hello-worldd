<script>
  import axiosInstance from '@/axiosInstance';
  export default {
    name: 'CreatePost',
    data() {
      return {
        description: '',
        errorMessage: '',
      };
    },
    methods: {
      createPost() {
        if (this.validateInput()) {
          console.log('Post Created.');
          console.log(`Description: ${this.description}`);

          axiosInstance
            .post('myapp/', {
              description: this.description,
            })
            .then((response) => {
              console.log(response.data);
              this.description = '';
            })
            .catch((error) => {
              console.error('Error:', error);
            });

          window.location.reload();
          // optionally emit an event or clear the form
          this.$emit('close');
        }
      },
      validateInput() {
        if (this.description.trim() === '') {
          this.errorMessage = 'Description is required.';
          return false;
        }
        this.errorMessage = '';
        return true;
      },
      closeModal() {
        this.$emit('close');
      },
    },
  };
</script>
<template>
  <div class="modal">
    <form @submit.prevent="createPost" class="card">
      <h3>Create Post</h3>
      <div class="text-field">
        <label for="description">Description:</label>
        <textarea name="description" id="description" v-model="description" />
      </div>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      <div class="row">
        <button type="submit">CREATE</button>
        <button type="button" @click="closeModal">CLOSE</button>
      </div>
    </form>
  </div>
</template>
