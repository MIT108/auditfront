<!-- eslint-disable -->
<template>
<v-card flat class="pa-3 mt-2">
    <v-form class="multi-col-validation">
        <v-card-text class="pt-5">
            <v-row>
                <v-col cols="12">
                    <v-textarea outlined rows="3" label="Description"></v-textarea>
                </v-col>

                <v-col cols="12" md="6">
                    <v-select  outlined dense label="Courier" :items="['USA','UK','AUSTRALIA','BRAZIL']"></v-select>
                </v-col>

                <v-col cols="12" md="6">
                    <v-select  outlined dense multiple chips small-chips label="Department" :items="['English','Spanish','French','German']"></v-select>
                </v-col>
            </v-row>
        </v-card-text>

        <v-card-text>
            <v-btn color="primary" class="me-3 mt-3">
                Envoyer
            </v-btn>
            <v-btn outlined class="mt-3" color="secondary" type="reset" @click.prevent="resetForm">
                Cancel
            </v-btn>
        </v-card-text>
    </v-form>
</v-card>
</template>

<script>
/* eslint-disable */
import {
    ref
} from '@vue/composition-api'

export default {
}
</script>
