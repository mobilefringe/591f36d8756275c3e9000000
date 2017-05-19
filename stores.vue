<template>
  <div class="container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
    <div class="columns large-3 medium-6" v-for="store in stores">
      <div class="card">
        <div class="card-divider">
          {{ store.name }}
        </div>
        <div class="card-section center">
          <a :href="store.image_url" target="_blank"><img :src="store.image_url"></a>
        </div>
        <div class="card-section">
          <div class="center">
            <router-link :to="{ name: 'storeDetails', params: { id: store.slug }}">View Details</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .center{
    text-align: center
  }
</style>

<script>
  define(["Vue"], function(Vue) {
    return Vue.component("stores-component", {
      template: template, // the variable template will be injected
      computed: {
        stores () {
          return this.$store.getters.processedStores;
        }
      }
    });
  });
</script>