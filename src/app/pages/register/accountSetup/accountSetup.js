/* ============
 * Account Setup
 * ============
 *
 * This is the page for registering basic info.
 */
import Forms from './../../../utils/forms/forms';
import Formvue from './../../../components/form/form.vue';
import authService from './../../../services/auth';
import timeZones from './../../../mixins/timeZones';
import accountTransformer from './../../../transformers/custom/accountSetup';


export default {
  data() {
    return {
      form: new Forms(
        {
          firstName: {
            value: '',
            type: 'text',
            label: 'First Name',
            placeholder: 'First Name'
          },
          lastName: {
            value: '',
            type: 'text',
            label: 'Last Name',
            placeholder: 'Last Name'
          },
          email: {
            value: '',
            type: 'email',
            label: 'Email',
            placeholder: 'Email'
          },
            timeZone: {
            value: '',
            type: 'select',
            label: 'Time Zone',
            placeholder: 'select time zone'
          },
          password: {
            value: '',
            type: 'password',
            label: 'Password',
            placeholder: 'Password'
          },
          passwordConfirmation: {
            value: '',
            type: 'password',
            label: 'Confirm password',
            placeholder: 'Confirm password'
          },
        }
      ),
    };
  },

  methods: {

    /**
     * This method will be called when saving the form.
     */
    register() {
      this.form.loading = true;
        const account = accountTransformer.send(this.form.data());
      console.log(account);
      authService.register(account)
        .catch((errors) => {
          this.form.loading = false;
          this.form.recordErrors(errors);
        });
    },
  },

    created() {
        this.form.setOptions('timeZone', this.timeZones);
    },

  components: {
    formv: Formvue,
  },
    mixins: [
        timeZones,
    ],
};
