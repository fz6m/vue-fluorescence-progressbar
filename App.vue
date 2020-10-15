<template>
  <router-view></router-view>
  <progress-bar></progress-bar>
  <router-view/>
</template>

<script>
import ProgressBar from './components/ProgressBar'
export default {
  components: { ProgressBar }
}
</script>
