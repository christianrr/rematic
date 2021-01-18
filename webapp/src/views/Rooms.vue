<template>
    <v-container class="pa-0">
        <v-flex d-flex>
            <v-layout wrap class="tiles">
                <v-flex xs6 sm4 md3 lg2 class="ma-0 pa-0" v-for="(item, index) in rooms" :key="item.name">
                    <DeviceTile
                        :title="item.name"
                        :icon="item.icon"
                        :to="item.link ? item.link : '/rooms/' + item.name"
                        :index="index"
                        v-if="item.show === 'true'"
                    ></DeviceTile>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import DeviceTile from '@/components/DeviceTile.vue';

export default {
    name: 'Rooms',
    components: {
        DeviceTile
    },
    data() {
        return {};
    },
    computed: {
        ...mapGetters(['rooms'])
    },
    methods: {
        ...mapActions([])
    }
};
</script>
