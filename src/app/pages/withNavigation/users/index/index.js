/* ============
 * Home Index
 * ============
 *
 * This is the home page.
 */

import { mapGetters } from 'vuex';
import store from './../../../../store';
import userService from './../../../../services/users';
import Forms from './../../../../utils/forms/forms';
import Formvue from './../../../../components/form/form.vue';
import cardv from './../../../../components/card/card.vue';
import modalFormv from './../../../../components/modalForm/modalForm.vue';
import timeZones from './../../../../mixins/timeZones';
import accountTransformer from './../../../../transformers/custom/accountSetup';

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
          editForm: new Forms({
              firstName: {
                  value: '',
                  type: 'text',
                  placeholder: 'First Name'
              },
              lastName: {
                  value: '',
                  type: 'text',
                  placeholder: 'Last Name'
              },
              email: {
                  value: '',
                  type: 'email',
                  placeholder: 'Email'
              },
              timeZone: {
                  value: '',
                  type: 'select',
              }
          }),
          loading: false,
          showModalEdit: false,
          showModalCreate: false,
          user: {},
          titleEdit: 'Edit User',
          titleCreate: 'Create User',
          dialogFormVisible: false
      };
  },

  methods: {
      currentUser(user) {
        return user.userId === this.account.userId;
      },
      openFormEdit(user) {
          this.user = user;
          this.showModalEdit = true;
          this.editForm.resetFields();
          this.editForm.assignData(user);
      },

      cancelFormEdit() {
          this.showModalEdit = true;
      },

      cancelFormCreate() {
          this.showModalCreate = false;
      },

      cancelFormEdit() {
          this.showModalEdit = false;
      },

      openFormCreate() {
          this.showModalCreate = true;
      },

      all(page, limit) {
        if (!this.loading) {
          this.loading = true;
          // eslint-disable-next-line
          userService.items(page, limit)
            .then((users) => {
              this.loading = false;
            }).catch(() => {
              this.loading = true;
            });
        };
      },
      /**
       * This method will be called when saving the form.
       */
      register() {
          this.form.loading = true;
          const user = accountTransformer.send(this.form.data());
          userService.store(user)
              .then(() => {
                  this.showModalCreate = false;
                  this.form.resetFields();
                  this.all(1, 50);
                  this.loading = false;
              })
              .catch((errors) => {
                  this.form.loading = true;
                  this.form.recordErrors(errors);
              });
      },

      /**
       * This method will be called to delete the user.
       */
      update() {
          this.loading = false;
          this.form.loading = true;
          const userEdit = accountTransformer.send(this.editForm.data());
          userService.update(this.user.userId, userEdit)
              .then(() => {
                  this.showModalEdit = false;
                  this.all(1, 50);
                  this.loading = false;
              })
              .catch((errors) => {
                  this.editForm.loading = true;
                  this.editForm.recordErrors(errors);
              });
      },

      openConfirm(user) {
        this.dialogFormVisible = true;
        this.user = user;
      },

      /**
       * This method will be called to delete the user.
       */
      destroy() {
          this.loading = false;
          this.dialogFormVisible = false;
          console.log(this.$confirm);
          userService.destroy(this.user.userId)
            .then(() => {
              this.all(1, 50);
              this.loading = false;
            })
            .catch((errors) => {
              console.log(errors);
            });

      },
  },

  computed: {
    ...mapGetters({
      users: 'users',
      account: 'account',
    }),
  },

  created() {
    this.editForm.setOptions('timeZone', this.timeZones);
    this.form.setOptions('timeZone', this.timeZones);
  },

  mounted() {
    this.all(1, 50);
  },

  destroyed() {
      store.dispatch('resetUsers');
  },

  components: {
        cardv: cardv,
        modalFormv: modalFormv,
        formv: Formvue,
  },

  mixins: [
    timeZones,
  ],

};
