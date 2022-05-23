<!-- eslint-disable -->
import { LIST_TOTAL_ROLE } from '@/store/storeConstants';
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
                    <v-text-field v-model="formData.name" label="Name" dense outlined></v-text-field>
                    <div v-if="error.name != null" style="color: red">
                      {{ error.name }}
                    </div>
                </v-col>

                <v-col cols="12" md="6">
                    <v-text-field v-model="formData.email" label="E-mail" dense outlined></v-text-field>
                    <div v-if="error.name != null" style="color: red">
                      {{ error.email }}
                    </div>
                </v-col>


                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formData.password"
                    type="password"
                    label="Password"
                    outlined
                    dense
                  ></v-text-field>
                    <div v-if="error.password != null" style="color: red">
                      {{ error.password }}
                      </div>
                </v-col>

                <v-col md="6" cols="12">
                    <v-text-field
                      v-model="cPassword"
                      type="password"
                      label="Confirm Password"
                      outlined
                      dense
                    ></v-text-field>
                    <div v-if="error.cPassword != null" style="color: red">
                      {{ error.cPassword }}
                      </div>
                </v-col>

                <v-col cols="12" md="6">
                    <v-select v-model="formData.role_id" dense outlined label="Role" :items="roles"></v-select>

                    <div v-if="error.role_id != null" style="color: red">
                      {{ error.role_id }}
                      </div>
                </v-col>



                <v-col cols="12">
                    <v-btn color="primary" class="me-3 mt-4"  v-on:click="onCreate()">
                        Create
                    </v-btn>
                    <v-btn color="secondary" outlined class="mt-4" type="reset" v-on:click="resetForm()">
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

import { LIST_TOTAL_ROLE, CREATE_NEW_USER } from '@/store/storeConstants';
import { mapActions } from 'vuex';
import Alert from '../../components/Alert'

export default {
  methods: {
    ...mapActions('role', {
      roleList : LIST_TOTAL_ROLE
    }),
    ...mapActions('users', {
      create : CREATE_NEW_USER
    }),
    resetForm(){
      this.formData.name = this.formData.email = this.formData.password = this.formData.role_id = this.cPassword = ""
    },
    onCreate(){

      if (this.formData.name.length == 0) {
        this.error.name = "name is required"
      }

      if (this.formData.email.length == 0) {
        this.error.email = "email is required"
      }

      if (this.formData.role_id.length == 0) {
        this.error.role_id = "role is required"
      }

      if (this.formData.password.length == 0) {
        this.error.password = "password is required"
      }

      if (this.formData.password != this.cPassword){
        this.error.cPassword = "the confirmation password does not match"
      }

      if (this.formData.name.length > 0 && this.formData.email.length > 0 && this.formData.role_id.length > 0 && this.formData.password.length >0 && this.formData.password == this.cPassword) {
        this.error.name = this.error.email = this.error.role_id = this.error.password = this.error.cPassword = null

        this.rolesArray.forEach((elt)=>{
          if (elt.name == this.formData.role_id) {
            this.formData.role_id = elt.id
          }
        })

        this.create(this.formData).then((response) => {
          if (response.status == 200) {
            this.type = "success"
            this.message = "created successfully"
            this.resetForm()
          }else{
            this.type = "warning"
            this.message = "unwanted error"
          }
        }).catch((error) => {
          console.log('====================================');
          console.log(error.data.message);
          console.log('====================================');
          this.type = "error"
          this.message = error.data.message

        })

      }
    }
  },
  data () {
    return {
      formData:{
        name: "",
        email: "",
        password: "",
        role_id: ""
      },
      error:{
        name: null,
        email: null,
        password: null,
        role_id: null,
        cPassword: null,
      },
      cPassword: "",
      roles: [],
      rolesArray: [],
      message: null,
      type: "success"
    }
  },
  components:{
    Alert
  },
  created () {
    this.roleList().then((response) => {

      this.rolesArray = response.data.data
      this.rolesArray.forEach(element => {
        this.roles.push(element.name)
      });
    })

  },
  setup(){
    const status = []
    return {
      status,
    }

  }
}
</script>
