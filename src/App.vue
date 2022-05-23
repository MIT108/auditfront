<template>
  <component :is="resolveLayout">
    <router-view></router-view>
  </component>
</template>

<script>
/* eslint-disable */
import { computed } from '@vue/composition-api'
import { useRouter } from '@/utils'
import LayoutBlank from '@/layouts/Blank.vue'
import LayoutContent from '@/layouts/Content.vue'
import { AUTO_LOGIN_ACTION, IS_USER_AUTHENTICATED_GETTER, TEST } from "./store/storeConstants"
import { mapActions } from 'vuex';

export default {
  components: {
    LayoutBlank,
    LayoutContent,
  },
  setup() {
    const { route } = useRouter()

    const resolveLayout = computed(() => {
      // Handles initial route
      if (route.value.name === null) return null

      if (route.value.meta.layout === 'blank') return 'layout-blank'

      return 'layout-content'
    })

    return {
      resolveLayout,
    }
  },
  methods: {
    ...mapActions("auth", {
      test: TEST
    })
  },
  created(){
      this.$store.dispatch(`auth/${AUTO_LOGIN_ACTION}`)
      this.test()

  }
}
</script>
