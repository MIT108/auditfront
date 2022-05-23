<!-- eslint-disable -->
<template>
<v-card flat class="pa-3 mt-2">
    <v-card-text>

    <!-- alert -->
    <v-col cols="12" v-if="message">
        <Alert :type=type :message=message />
    </v-col>
            <div
              class="imagePreviewWrapper"
              :style="{ 'background-image': `url(${previewImage})` }"
              @click="selectImage">
            </div>
        <br>
        <!-- upload photo -->
        <div>
            <div v-if="error.image != null" style="color: red">
              {{ error.image }}
            </div>
            <v-btn color="primary" class="me-3 mt-5" @click="$refs.fileInput.click()">
                <v-icon class="d-sm-none">
                    {{ icons.mdiCloudUploadOutline }}
                </v-icon>
                <span class="d-none d-sm-block">Upload document</span>
            </v-btn>

            <input ref="fileInput" type="file" @input="pickFile" accept=".jpeg,.png,.jpg,GIF" :hidden="true" />

            <p class="text-sm mt-5">
                Allowed JPG, GIF or PNG. Max size of 800K
            </p>
        </div>
    </v-card-text>

    <v-card-text>
        <v-form class="multi-col-validation mt-6" @submit.prevent="onCreate" >
            <v-row>
                <v-col md="12" cols="12">
                    <v-text-field v-model="data.name" required label="name" dense outlined></v-text-field>
                    <div v-if="error.name != null" style="color: red">
                      {{ error.name }}
                    </div>
                </v-col>
                <v-col cols="12">
                    <v-textarea outlined rows="3" v-model="data.description" required label="Description"></v-textarea>

                    <div v-if="error.description != null" style="color: red">
                      {{ error.description }}
                    </div>
                </v-col>
                <v-col cols="12">
                    <v-btn color="primary" type="submit" class="me-3 mt-4">
                        Save changes
                    </v-btn>
                    <v-btn color="secondary" outlined class="mt-4" type="reset" @click.prevent="onReset">
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
import { mapActions } from 'vuex'
import { CREATE_COURIER } from '../../store/storeConstants'
import Alert from '../../components/Alert'

export default {
  components:{
    Alert
  },
  data () {
    return {
      previewImage: null,
      data: {
        name: "",
        description: "",
        image: "",
      },
      error: {
        image: null,
        description: null,
        name: null
      },
      type: "success",
      message: null
    }
  },
  methods: {
    ...mapActions('courier', {
      create: CREATE_COURIER,
    }),
    onCreate(){
      if (this.data.name.length == 0) {
        this.error.name = "name is required"
      }
      if (this.data.description.length == 0) {
        this.error.description = "description is required"
      }
      if (this.data.image == null) {
        this.error.image = "image is required"
      }

      if (this.data.name.length > 0 && this.data.description.length > 0) {
        this.error.name = this.error.description = this.error.image = null
        this.create(this.data).then((response) => {
          if (response.status == 200) {
            this.type = "success"
            this.message = "successful"
          }
          this.onReset();
        }).catch((error) => {
          this.type = "error"
          this.message = error.data.message
        })

      }
    },
    onReset(){
      this.data.name = this.data.description = this.data.image = ""
    },
      selectImage () {
          this.$refs.fileInput.click()
      },
      pickFile () {
        let input = this.$refs.fileInput
        let file = input.files
        if (file && file[0]) {
          this.data.image = file[0]
          let reader = new FileReader
          reader.onload = e => {
            this.previewImage = e.target.result
          }
          reader.readAsDataURL(file[0])
          this.$emit('input', file[0])
        }
      }
  },
    props: {
        accountData: {
            type: Object,
            default: () => {},
        },
    },
    setup(props) {
        const status = ['Active', 'Inactive', 'Pending', 'Closed']

        const accountDataLocale = ref(JSON.parse(JSON.stringify(props.accountData)))

        const resetForm = () => {
            accountDataLocale.value = JSON.parse(JSON.stringify(props.accountData))
        }

        let imageUrl = ref("")


        return {
          imageUrl,
            status,
            accountDataLocale,
            resetForm,
            icons: {
                mdiAlertOutline,
                mdiCloudUploadOutline,
            },
        }
    },
}
</script>


<style scoped>
.imagePreviewWrapper {
    width: 250px;
    height: 250px;
    display: block;
    cursor: pointer;
    margin: 0 auto 30px;
    background-size: cover;
    background-position: center center;
}
</style>
