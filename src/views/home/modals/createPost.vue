<script>
import { db } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';

  export default {
    name: 'CreatePost',
    data() {
      return {
        description: '',
        errorMessage: '',
      };
    },
    methods: {
      async createPost(){
        try{
          const docRef = await addDoc(collection(db, 'blogCollection'),{
            description: this.description,
            create_date: new Date()
          });
          console.log('Document written with ID: ', docRef.id);
          this.description = '';
          
          window.location.reload();
          this.$emit('close');
        }catch(error){
          console.error('Error saving to firebase:',error);
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
