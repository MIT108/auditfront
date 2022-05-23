<template>
  <div>

    <!-- alert -->
        <v-alert :color=type text class="mb-0">
            <div class="d-flex align-start">

                <div class="ms-3">
                    <p class="text-base font-weight-medium mb-1">
                        {{ message }}
                    </p>
                </div>
            </div>
        </v-alert>
  </div>
</template>
<script>
export default {
  props: {
    type: String,
    message: String,
  }
}
</script>
