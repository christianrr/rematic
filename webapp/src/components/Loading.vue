<template>
    <v-overlay :value="showLoading" color="white" opacity="1" z-index="8">
        <v-progress-circular indeterminate size="64" color="primary" class="mt-6"></v-progress-circular>
    </v-overlay>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: mapGetters(['showLoading'])
};
</script>
