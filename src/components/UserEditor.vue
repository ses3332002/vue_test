<template>
  <form novalidate class="md-layout" @submit.prevent="validateUser">
    <md-card class="form_content">
      <md-card-media v-if="id !== 'new' && form.picture !== ''">
        <img :src="form.picture" alt="user picture" class="avatar" />
      </md-card-media>
      <md-card-content>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('title')">
              <label for="title">Title</label>
              <md-select
                name="title"
                id="title"
                v-model="form.title"
                md-dense
                :disabled="sending"
              >
                <md-option value="Mr">Mr</md-option>
                <md-option value="Ms">Ms</md-option>
                <md-option value="Miss">Miss</md-option>
                <md-option value="Mrs">Mrs</md-option>
              </md-select>
              <span class="md-error">The title is required</span>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('firstName')">
              <label for="first-name">First Name</label>
              <md-input
                name="first-name"
                id="first-name"
                autocomplete="given-name"
                v-model="form.firstName"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.firstName.required"
                >The first name is required</span
              >
              <span class="md-error" v-else-if="!$v.form.firstName.minlength"
                >Invalid first name</span
              >
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('lastName')">
              <label for="last-name">Last Name</label>
              <md-input
                name="last-name"
                id="last-name"
                autocomplete="family-name"
                v-model="form.lastName"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.lastName.required"
                >The last name is required</span
              >
              <span class="md-error" v-else-if="!$v.form.lastName.minlength"
                >Invalid last name</span
              >
            </md-field>
          </div>
        </div>

        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('gender')">
              <label for="gender">Gender</label>
              <md-select
                name="gender"
                id="gender"
                v-model="form.gender"
                md-dense
                :disabled="sending"
              >
                <md-option value="male">Male</md-option>
                <md-option value="female">Female</md-option>
              </md-select>
              <span class="md-error">The gender is required</span>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('age')">
              <label for="age">Age</label>
              <md-input
                type="number"
                id="age"
                name="age"
                autocomplete="age"
                v-model="form.age"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.age.required"
                >The age is required</span
              >
              <span class="md-error" v-else-if="!$v.form.age.maxlength"
                >Invalid age</span
              >
            </md-field>
          </div>
        </div>

        <md-field :class="getValidationClass('email')">
          <label for="email">Email</label>
          <md-input
            type="email"
            name="email"
            id="email"
            autocomplete="email"
            v-model="form.email"
            :disabled="sending"
          />
          <span class="md-error" v-if="!$v.form.email.required"
            >The email is required</span
          >
          <span class="md-error" v-else-if="!$v.form.email.email"
            >Invalid email</span
          >
        </md-field>
      </md-card-content>

      <md-progress-bar md-mode="indeterminate" v-if="sending" />

      <md-card-actions>
        <md-button class="md-accent" :disabled="sending" @click="cancelHandler"
          >Cancel
        </md-button>
        <md-button type="submit" class="md-primary" :disabled="sending"
          >Save user
        </md-button>
      </md-card-actions>
    </md-card>

    <md-snackbar :md-active.sync="userSaved"
      >The user {{ lastUser }} was saved with success!
    </md-snackbar>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate';
import {
  required,
  email,
  minLength,
  maxLength
} from 'vuelidate/lib/validators';
import { createNamespacedHelpers } from 'vuex';

const { mapGetters, mapMutations } = createNamespacedHelpers('users');

export default {
  props: {
    id: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      userSaved: false,
      sending: false,
      lastUser: null,
      form: null
    };
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  created() {
    this.setCurrentUser(this.id);
    this.form = this.currentUser;
  },
  mixins: [validationMixin],
  validations: {
    form: {
      firstName: {
        required,
        minLength: minLength(3)
      },
      lastName: {
        required,
        minLength: minLength(3)
      },
      age: {
        required,
        maxLength: maxLength(3)
      },
      gender: {
        required
      },
      title: {
        required
      },
      email: {
        required,
        email
      }
    }
  },
  methods: {
    ...mapMutations(['setCurrentUser', 'saveCurrentUser']),
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form = null;
    },
    saveUser() {
      this.sending = true;
      this.lastUser = `${this.form.firstName} ${this.form.lastName}`;
      this.saveCurrentUser({ ...this.form, id: this.id });
      this.userSaved = true;
      this.sending = false;
      this.clearForm();
      this.$router.push('/');
    },
    cancelHandler() {
      this.clearForm();
      this.$router.push('/');
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveUser();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}

.form_content {
  margin: auto;
}

.md-card-media {
  text-align: center;
}

.avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  margin: 16px;
}
</style>
