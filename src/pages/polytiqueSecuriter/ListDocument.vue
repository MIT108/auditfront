<template>
<v-card flat class="pa-3 mt-2">

    <v-card-text>
        <v-form class="multi-col-validation mt-6">
            <v-row>
                <v-col md="6" cols="12">
                    <v-text-field v-model="accountDataLocale.username" label="Name" dense outlined></v-text-field>
                </v-col>

                <v-col cols="6" md="6">
                    <v-text-field v-model="accountDataLocale.company" dense outlined label="Chef departement"></v-text-field>
                </v-col>

                <v-col cols="12" md="12">
                    <v-textarea outlined rows="3" v-model="accountDataLocale.role" required label="Description"></v-textarea>
                </v-col>


                <v-col cols="12">
                    <v-btn color="primary" class="me-3 mt-4">
                        Save changes
                    </v-btn>
                    <v-btn color="secondary" outlined class="mt-4" type="reset" @click.prevent="resetForm">
                        Cancel
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-card-text>
</v-card>
</template>

<script>
import {
    mdiAlertOutline,
    mdiCloudUploadOutline
} from '@mdi/js'
import {
    ref
} from '@vue/composition-api'

export default {
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

        return {
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
