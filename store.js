define(['Vue', 'vuex', 'axios', 'js-cookie', 'moment', 'moment-timezone'], function (Vue, Vuex, axios, Cookies, moment, tz) {
  Vue.use(Vuex);
  const store = new Vuex.Store({
    state: {
      results: [],
      locale: null
    },
    actions: {
      LOAD_MALL_DATA: function ({ commit }) {
        return new Promise((resolve, reject) => {
          axios.get("https://www.mallmaverick.com/api/v4/halifaxcentre/all.json").then(response => {
            commit('SET_MALL_DATA', { list: response.data })
            resolve(response);
          }).catch(error => {
            console.log("Data load error: " + error.message);
            reject(error);
          });
        })
      },
      INITIALIZE_LOCALE: function ({ commit }) {
        return new Promise((resolve, reject) => {
          let _locale = Cookies.get('locale');
          if (!_locale) {
            _locale = 'en-ca';
          }
          commit('SET_LOCALE', { lang: _locale })
          resolve(_locale);
        })
      },
    },
    mutations: {
      SET_MALL_DATA: (state, { list }) => {
        state.results = list
      },
      SET_LOCALE: (state, { lang }) => {
        state.locale = lang
        Cookies.set('locale', lang);
      }
    },
    getters: {
      getLocale: state => {
        let locale = state.locale;
        return locale;
      },
      getTimezone: state => {
        let property = state.results.property;
        let timezone = property.timezone_moment;
        return timezone;
      },
      getTodayHours: state => {
        try {
          let hours = state.results.hours;
          let property = state.results.property;
          let timezone = property.timezone_moment;
          let todayHours = hours.find(hour => hour.day_of_week === moment().day());
          let holidayHours = hours.find(hour => hour.is_holiday == true && (moment(hour.holiday_date).tz(timezone).date() == moment().tz(timezone).date() && moment(hour.holiday_date).tz(timezone).month() + 1 == moment().tz(timezone).month() + 1 && moment(hour.holiday_date).tz(timezone).year() == moment().tz(timezone).year()));
          let hoursObject = null;
          if (holidayHours){
            hoursObject = holidayHours;
          }
          else{
            hoursObject = todayHours;
          }
          
          hoursObject.locale = state.locale; // IMPORTANT! Here I am adding the state's locale in the hours object such that it will trigger a change in the template anytime the locale changes in the app.

          return hoursObject;
        }
        catch (err) {
          return null;
        }
      },
      processedStores: state => {
        try {
          let stores = state.results.stores;
          // Add image_url attribute with CDN link
          stores.map(store => {
            store.image_url = "https://mallmaverick.cdn.speedyrails.net" + store.store_front_url;
          });
          return stores;
        }
        catch (err) {
          return [];
        }
      },
      findStoreBySlug: (state, getters) => (slug) => {
        let stores = state.results.stores;
        return stores.find(store => store.slug === slug)
      }
    },
    modules: {

    }
  });
  return store;
});
