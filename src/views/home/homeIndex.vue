<script>
  import CreatePost from './modals/createPost.vue';
  import axiosInstance from '@/axiosInstance';
  import PostContainer from './components/postContainer.vue';

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
      fetchData() {
        axiosInstance
          .get('myapp/')
          .then((response) => {
            this.posts = response.data;
          })
          .catch((error) => {
            console.error('Error fetching posts:', error);
          });
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
      <div v-for="(post, index) of posts" :key="index">
        <!-- <p>{{ post.description }}</p>
        <p>{{ post.create_date }}</p> -->
        <PostContainer
          :description="post.description"
          :date="post.create_date"
        />
      </div>
    </main>
    <CreatePost v-if="showModal" @close="hideCreatePostModal" />
  </div>
</template>
