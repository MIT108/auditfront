<!-- eslint-disable -->
<template>
<v-card flat class="pa-3 mt-2">

    <!-- alert -->
    <v-col cols="12" v-if="message">
        <Alert :type=type :message=message />
    </v-col>
    <v-card-text>
        <v-form class="multi-col-validation mt-6">
            <v-row>

                <v-col md="12" cols="12">
                    <v-text-field v-model="data.name" label="Name" dense outlined></v-text-field>
                    <div v-if="error.name != null" style="color: red">
                      {{ error.name }}
                    </div>
                </v-col>
                <v-col cols="12">
                    <v-textarea outlined rows="3" v-model="data.description" label="Description"></v-textarea>
                    <div v-if="error.description != null" style="color: red">
                      {{ error.description }}
                    </div>
                </v-col>

                <v-col cols="12">
                    <v-btn color="primary" class="me-3 mt-4" v-on:click="onCreate()">
                        Add
                    </v-btn>
                    <v-btn color="secondary" outlined class="mt-4" type="reset" v-on:click="resetData()">
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
import Alert from '../../components/Alert'
import { mapActions } from 'vuex';
import { CREATE_NEW_ROLE } from '@/store/storeConstants';

export default {
  methods: {
    ...mapActions('role', {
      create : CREATE_NEW_ROLE
    }),
    resetData(){
      this.data.name = this.data.description = null
    },
    onCreate(){

      if (this.data.description.length == 0) {
        this.error.description = "description is required"
      }

      if (this.data.name.length == 0) {
        this.error.name = "name is required"
      }

      if (this.data.description.length > 0 && this.data.name.length > 0) {
        this.error.description = this.error.name = null
        this.create(this.data).then((response)=>{
          if (response.status == 200) {
            this.type = "success"
            this.message = "successful"
          }
        }).catch((error)=>{
          this.type = "error"
          this.message = error.data.message
        })
      }
    }
  },
  data () {
    return {
      type: "success",
      message: null,
      data: {
        name: "",
        description: "",
      },
      error:{
        name: null,
        description: null,
      }
    }
  },
  components:{
    Alert
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
