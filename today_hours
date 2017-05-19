<template>
  <div class="container">
    <h3>Shopping Hours</h3>
    <p v-if="!hours.is_closed">{{todayDate | moment("ddd", timezone)}} {{hours.open_time | moment("LT", timezone)}} - {{hours.close_time | moment("LT", timezone)}}</p>
    <p v-if="hours.is_closed">Closed</p>
  </div>
</template>

<script>
  define(["Vue", "moment", "moment-timezone", "vue-moment"], function(Vue, moment, tz, VueMoment) {
    return Vue.component("today-hours", {
      template: template, // the variable template will be injected,
      data: function() {
        return {
          todayDate: new Date(),
          description: "An example of integration of Mall Maverick with Vue.js"
        }
      },
      computed: {
        hours () {
          return this.$store.getters.getTodayHours;
        },
        timezone () {
          return this.$store.getters.getTimezone;
        }
      }
    });
  });
</script>
