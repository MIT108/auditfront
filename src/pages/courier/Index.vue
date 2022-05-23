/* eslint-disable */
<template>
  <v-card id="account-setting-card">
    <!-- tabs -->
    <v-tabs
      v-model="tab"
      show-arrows
    >
      <v-tab
        v-for="tab in tabs"
        :key="tab.icon"
      >
        <v-icon
          size="20"
          class="me-3"
        >
          {{ tab.icon }}
        </v-icon>
        <span>{{ tab.title }}</span>
      </v-tab>
    </v-tabs>

    <!-- tabs item -->
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <ListDocument :account-data="accountSettingData.account"></ListDocument>
      </v-tab-item>

      <v-tab-item>
        <AddDocument></AddDocument>
      </v-tab-item>

      <v-tab-item>
        <AddDepartment></AddDepartment>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
// eslint-disable
import { mdiAccountOutline, mdiLockOpenOutline, mdiInformationOutline, mdiClipboardOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'

// demos
import ListDocument from './ListDocument.vue'
import AddDocument from './AddDocument.vue'
import AddDepartment from './AddDepartment.vue'

export default {
  components: {
    ListDocument,
    AddDocument,
    AddDepartment,
  },
  setup() {
    const tab = ref('')

    // tabs
    const tabs = [
      { title: 'Ajouter un document', icon: mdiAccountOutline },
      { title: 'List de document', icon: mdiClipboardOutline },
      { title: 'Envoyer a un departement', icon: mdiInformationOutline },
    ]

    // account settings data
    const accountSettingData = {
      account: {
        avatarImg: require('@/assets/images/avatars/1.png'),
        username: 'johnDoe',
        name: 'john Doe',
        email: 'johnDoe@example.com',
        role: 'Admin',
        status: 'Active',
        company: 'Google.inc',
      },
      information: {
        bio: 'The name’s John Deo. I am a tireless seeker of knowledge, occasional purveyor of wisdom and also, coincidentally, a graphic designer. Algolia helps businesses across industries quickly create relevant 😎, scaLabel 😀, and lightning 😍 fast search and discovery experiences.',
        birthday: 'February 22, 1995',
        phone: '954-006-0844',
        website: 'https://themeselection.com/',
        country: 'USA',
        languages: ['English', 'Spanish'],
        gender: 'male',
      },
    }

    return {
      tab,
      tabs,
      accountSettingData,
      icons: {
        mdiAccountOutline,
        mdiLockOpenOutline,
        mdiInformationOutline,
        mdiClipboardOutline,
      },
    }
  },
}
</script>
