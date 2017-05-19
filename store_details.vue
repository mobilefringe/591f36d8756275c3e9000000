<template>
  <div v-if="currentStore">
    <h1>Store details</h1>
    <h1>{{currentStore.name}}</h1>
  </div>
</template>

<script>
  define(["Vue"], function(Vue) {
    return Vue.component("store-details-component", {
      template: template, // the variable template will be injected,
      data: function() {
        return {
          title: "MM with Vue.js!",
          description: "An example of integration of Mall Maverick with Vue.js",
          currentStore: null
        }
      },
      beforeRouteEnter (to, from, next) {
        next(vm => {
          // access to component instance via `vm`
          vm.currentStore = vm.findStoreBySlug(to.params.id);
          if (vm.currentStore === null || vm.currentStore === undefined){
            vm.$router.replace({ name: '404'});
          }
        })
      },
      beforeRouteUpdate (to, from, next) {
        this.currentStore = this.findStoreBySlug(to.params.id);
        if (this.currentStore === null || this.currentStore === undefined){
          this.$router.replace({ name: '404'});
        }
      },
      computed: {
        findStoreBySlug () {
          return this.$store.getters.findStoreBySlug;
        }
      }
    });
  });
</script>
