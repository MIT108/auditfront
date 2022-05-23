<!-- eslint-disable -->
<template>
<v-card style="margin: 20px">
    <!-- alert -->
    <v-col cols="12" v-if="message">
        <Alert :type=type :message=message />
    </v-col>
    <v-data-table :headers="headers" :items="roleList" item-key="id" class="table-rounded">
            <!-- name -->
            <template #[`item.name`]="{item}">
                <div class="d-flex flex-column">
                    <span class="d-block font-weight-semibold text--primary text-truncate">
                        <v-text-field v-model="item.name" style="border: 0px solid black; width: 100%"></v-text-field>
                    </span>
                </div>
            </template>
            <!-- email -->
            <template #[`item.description`]="{item}">
                <div class="d-flex flex-column">
                    <span class="d-block font-weight-semibold text--primary text-truncate">
                        <v-text-field v-model="item.description" style="border: 0px solid black; width: 100%"></v-text-field>
                    </span>
                </div>
            </template>
            <!-- status -->
            <template #[`item.status`]="{item}" class="row d-flex" style="display: flex !important">
                <div style="display: flex; justify-content: center, align-items: center">
                    <div class="col-4">
                        <v-img src="https://img.icons8.com/fluency/48/000000/approve-and-update.png" v-on:click="onUpdate(item.id)" style="cursor: pointer"></v-img>
                    </div>
                    <div class="col-4">
                        <v-img src="https://img.icons8.com/color/48/000000/delete-forever.png"  v-on:click="onDelete(item.id)"  style="cursor: pointer"></v-img>
                    </div>
                </div>

            </template>
        <v-form action="post" @submit.prevent="onLogin()">
        </v-form>

    </v-data-table>
</v-card>
</template>

<script>
/* eslint-disable */
import {
    mdiSquareEditOutline,
    mdiDotsVertical
} from '@mdi/js'
import {
    mapActions
} from 'vuex'
import data from './datatable-data'
import {
    LIST_ALL_ROLE, UPDATE_ROLE, DELETE_ROLE
} from '@/store/storeConstants';
import Alert from '../../components/Alert'

export default {
    components:{
      Alert
    },
    data() {
        return {
            type: "success",
            message: null,
            headers: [{
                    text: 'NAME',
                    value: 'name'
                },
                {
                    text: 'DESCRIPTION',
                    value: 'description'
                },
                {
                    text: 'DATE',
                    value: 'created_at'
                },
                {
                    text: 'STATUS',
                    value: 'status'
                },
            ],
            roleList: data,
            icons: {
                mdiSquareEditOutline,
                mdiDotsVertical,
            },
        }
    },
    created() {
        this.listAll().then((response) => {
            this.roleList = response.data.data
        })
    },
    methods: {
        ...mapActions('role', {
            listAll: LIST_ALL_ROLE,
            update: UPDATE_ROLE,
            delete: DELETE_ROLE,
        }),
        onUpdate(id){
          let data = ''

          this.roleList.forEach((role) =>{
            if (role.id == id) {
              data = {
                role_id : role.id,
                name : role.name,
                description : role.description
              }
            }
          })
          this.update(data).then((response) => {
            if (response.status == 200) {
              this.type = "success"
              this.message = "updated successfully"

            }
          }).catch((error) => {
              this.type = "error"
              this.message = error.data.message
          })
        },
        onDelete(id){
          this.delete(id).then((response) => {
            if (response.status == 200) {
              this.type = "success"
              this.message = "deleted successfully"

              this.listAll().then((response) => {
                  this.roleList = response.data.data
              })
            }
          }).catch((error) => {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
            this.type = "error"
            this.message = error.data.message
          })

        }
    },
    setup() {
        return {}
    },
}
</script>
