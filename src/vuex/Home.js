/**
 * @author She.L
 * @version 2016/12/7
 * @description 首页 {最新职位，新进员工}
 */
import Vue from 'vue';


const moduleHome = {
  state: {
    jobs: [],
    emps: [],
  },

  /* eslint-disable no-param-reassign*/
  mutations: {
    setJobs(state, payload) {
      state.jobs = payload;
    },

    setEmps(state, payload) {
      state.emps = payload;
    },

  },

  actions: {
    async getJobs({ commit }) {
      Vue.http.get('http://epdemo.cdpyun.com/wp-json/wp/v2/job_listing?page=1')
        .then((response) => {
          const jobs = response.body.map((item) => {
            const {
              link,
              title,
              job_location: location,
              job_listing_type: type,
              company_tagline: tagline,
              } = item;
            const text = location + type + tagline;
            const subtitle = title.rendered;

            return { link, text, subtitle };
          });

          commit('setJobs', jobs);
        });
    },

    async getEmps({ commit }) {
      Vue.http.get('http://epdemo.cdpyun.com/wp-json/wp/v2/posts?categories=40')
        .then((response) => {
          const emps = response.body.map((item) => {
            const {
              link,
              title,
              better_featured_image,
              } = item;
            const img = better_featured_image.source_url;
            const subtitle = title.rendered;

            return { link, img, subtitle };
          });

          commit('setEmps', emps);
        });
    },

  },
};

export default moduleHome;
