/* ============
 * Reset password
 * ============
 *
 * This is the page for reseting the user password.
 */

import auth from './../../../services/auth';
import Forms from './../../../utils/forms/forms';

export default {
  data() {
    return {
      form: new Forms({
        email: {
          value: '',
          type: 'email',
        },
      }),
    };
  },

  methods: {
    /**
     * Sends the reset password link.
     */
    send() {
      this.form.loading = true;
      auth.resetPassword(this.form.data())
      .then(() => {
        this.form.loading = false;
        this.form.email = '';
        this.form.successMessage = this.$t('static.resetPassword.successMessage');
      })
      .catch((errors) => {
        this.form.loading = false;
        this.form.recordErrors(errors);
      });
    },
  },

  components: {
    VForm: require('./../../../components/form/form.vue'),
    VLayout: require('./../../../layouts/user/user.vue'),
  },
};
