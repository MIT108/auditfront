<!-- eslint-disable -->
<template>
<v-card flat class="pa-3 mt-2">
    <v-card-text>
        <v-form class="multi-col-validation mt-6">
            <v-row>


                <!-- alert -->
                <v-col cols="12" v-if="message">
                  <Alert :type=type :message=message />
                </v-col>

                <v-col md="6" cols="12">
                    <v-text-field v-model="userName" label="Name" dense outlined></v-text-field>
                    <div v-if="errorName != null" style="color: red">
                      {{ errorName }}
                    </div>
                </v-col>

                <v-col cols="12" md="6">
                    <v-text-field v-model="userEmail" label="E-mail" dense outlined></v-text-field>
                    <div v-if="errorEmail != null" style="color: red">
                      {{ errorEmail }}
                    </div>
                </v-col>

                <v-col cols="12">
                    <v-btn color="primary" v-on:click="onUpdate()" class="me-3 mt-4">
                    Update
                    </v-btn>
                    <v-btn color="secondary" outlined class="mt-4" type="reset" >
                        Cancel
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-card-text>
</v-card>
</template>

<script>
/* eslint-disable */
import {
    mdiAlertOutline,
    mdiCloudUploadOutline
} from '@mdi/js'
import {
    ref
} from '@vue/composition-api'
import { mapMutations, mapGetters, mapActions } from 'vuex';
import { GET_USER_EMAIL, GET_USER_NAME, UPDATE_USER_INFORMATION } from '../../store/storeConstants'
import Alert from '../../components/Alert'

export default {
  components:{
    Alert
  },
  created () {

    this.userName = this.name
    this.userEmail = this.email
  },
  data () {
    return {
      userName: null,
      userEmail: null,
      errorEmail: null,
      errorName: null,
      message: null,
      type: "success"
    }
  },
  computed:{
    ...mapGetters("auth", {
      name: GET_USER_NAME,
      email: GET_USER_EMAIL
    })
  },
  methods: {
    ...mapActions("users", {
      updateInfo : UPDATE_USER_INFORMATION
    }),
    onUpdate() {
      if (this.userEmail.length == 0) {
        this.errorEmail = "your email is required"
      }

      if (this.userName.length == 0) {
        this.errorName = "your name is required"
      }

      if (this.userName.length > 0 && this.userEmail.length > 0) {
        this.errorEmail = null
        this.errorName = null
        let userData = {
          name: this.userName,
          email: this.userEmail
        }
        this.updateInfo(userData).then((response) => {
          if (response.status == 200) {
            this.type = "success"
            this.message = "updated successfully"
          }else{
            this.type = "warning"
            this.message = "unwanted error"
          }

        }).catch((error) => {
          this.type = "error"
          this.message = error.data.message

        })
      }

    }
  },
    setup() {
        return {
            icons: {
                mdiAlertOutline,
                mdiCloudUploadOutline,
            },
        }
    },
}
</script>
