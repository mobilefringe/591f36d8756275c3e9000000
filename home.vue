<template>
  <div class="row">
    <div class="large-6 columns">
      <div>
        <h1>{{title}}</h1>
        <p>{{description}}</p>
        <hr/>
        <h5>Translated text example:</h5>
        <p>{{ $t("message.hello") }}</p>
        <hr/>
        <today-hours></today-hours>
      </div>
    </div>
  </div>
</template>

<script>
  define(["Vue", "vue!today_hours.vue"], function(Vue, TodayHoursComponent) {
    return Vue.component("home-component", {
      template: template, // the variable template will be injected
      data: function() {
        return {
          title: "MM with Vue.js!",
          description: "An example of integration of Mall Maverick with Vue.js"
        }
      }
    })
  })
</script>
