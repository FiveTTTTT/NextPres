<template>
  <h1>Bookin' movies</h1>


  <h2>Most liked</h2>
  <Movies category="best"></Movies>
  <h2>comedy</h2>
  <Movies category="comedy"></Movies>
  <h2>horror</h2>
  <Movies category="horror"></Movies>
  <h2>adventure</h2>
  <Movies category="adventure"></Movies>
  <h2>action</h2>
  <Movies category="action"></Movies>
  <h2>fantasy</h2>
  <Movies category="fantasy"></Movies>
</template>

<script>
import Movies from '../components/Movies.vue'

export default {
  name: 'app',
  components: {
    Movies
  }
}
</script>