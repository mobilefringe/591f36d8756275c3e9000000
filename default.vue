<template>
  <router-view></router-view>
</template>

<script>
  define(["Vue"], function(Vue) {
    return Vue.component("default-component", {
      template: template // the variable template will be injected
    });
  });
</script>