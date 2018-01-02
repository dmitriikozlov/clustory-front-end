
import Formvue from './../form/form.vue';
import timeZones from './../../mixins/timeZones';


export default {
  data() {
    return {

    };
  },
  props: {
    form: {
      type: Object,
      required: false,
    },
    show: {
      type: Boolean,
      required: true,
      default: false,
    },
    cancelForm: {
      type: Function,
    },
    submit: {
      type: Function,
    },
    title: {
      type: String,
      required: false,
    },
  },

  methods: {
    onSubmit() {
     console.log('submit');
    },
  },

  watch: {
    /**
     * Watches state update to inject on Forms class.
     *
     * @param  {Object} deposits    The all deposits list.
     */
    timeZones(deposits) {
    },

  },


  components: {
    formv: Formvue,
  },

  mixins: [
    timeZones,
  ],
};
