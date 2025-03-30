<script setup>
import { ref } from 'vue'
import HomeView from './components/HomeView.vue';
import AboutView from './components/AboutView.vue';

const message = ref('')
const greeting = (newMessage) => {
  message.value = newMessage
}

const childRef = ref(null)
const triggerChildEvent = () => {
  if (childRef.value) {
    childRef.value.childMethod()
  }
}
// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header> -->

  <main>
     <HomeView v-on:custom-event="greeting"/>

     <p>{{ message }}</p>
     
     <AboutView ref="childRef" />
     <button v-on:click="triggerChildEvent">親から子コンポーネントを操作</button>
  </main>
</template>

<!-- <style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style> -->
