<script>
  import CreatePost from './modals/createPost.vue';
  import PostContainer from './components/postContainer.vue';
  import { collection, getDocs, Timestamp } from 'firebase/firestore';
  import { db } from '@/firebase';
  export default {
    name: 'HomeIndex',
    components: {
      CreatePost,
      PostContainer,
    },
    data() {
      return {
        showModal: false,
        posts: [],
      };
    },
    methods: {
      async fetchData() {
        try {
          const querySnapshot = await getDocs(collection(db, 'blogCollection'));
          this.posts = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              create_date: this.formatTimestamp(data.create_date instanceof Timestamp ? data.create_date : new Timestamp(data.create_date.seconds, data.create_date.nanoseconds)),
            }
          }).sort((a,b) => new Date(b.create_date) - new Date(a.create_date));
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      },
      formatTimestamp(timestamp){
        if(timestamp instanceof Timestamp){
          const date = timestamp.toDate();
          const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          };
          return new Intl.DateTimeFormat('en-US', options).format(date).replace(',', '').replace('/','•').replace('/','•');
        }
        return '';
      },
      showCreatePostModal() {
        this.showModal = true;
      },
      hideCreatePostModal() {
        this.showModal = false;
      },
      handleKeydown(event) {
        if (event.key === 'n' || event.key === 'N') {
          this.showCreatePostModal();
        } else if (event.key === 'Escape') {
          this.hideCreatePostModal();
        }
      },
    },
    mounted() {
      window.addEventListener('keydown', this.handleKeydown);
      this.fetchData();
    },
    beforeUnmount() {
      window.removeEventListener('keydown', this.handleKeydown);
    },
  };
</script>

<template>
  <div>
    <header>
      <div class="logo">Ralph Maron Eda</div>
      <div class="action" @click="showCreatePostModal">New Post</div>
    </header>
    <main>
      <div v-if="posts.length > 0">
        <div v-for="(post, index) of posts" :key="index">
          <PostContainer
            :description="post.description"
            :date="post.create_date"
          />
        </div>
      </div>
      <div v-else>
        <PostContainer
          :description="'No post available'"
          :date="'2024-08-03'"
        />
      </div>
    </main>
    <CreatePost v-if="showModal" @close="hideCreatePostModal" />
  </div>
</template>
