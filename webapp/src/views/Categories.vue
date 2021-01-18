<template>
    <v-container class="pa-0">
        <v-flex d-flex>
            <v-layout wrap class="tiles">
                <v-flex
                    xs6
                    sm4
                    md3
                    lg2
                    class="ma-0 pa-0"
                    v-for="(item, index) in categories"
                    :key="item.name"
                    :style="item.show === 'true' ? 'display:block' : 'display:none'"
                >
                    <DeviceTile
                        :title="item.name"
                        :icon="item.icon"
                        :to="item.link ? item.link : '/categories/' + item.name"
                        :isLoading="item.isLoading"
                        :index="index"
                    ></DeviceTile>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import DeviceTile from '@/components/DeviceTile.vue';

export default {
    name: 'Categories',
    components: {
        DeviceTile
    },
    computed: {
        ...mapGetters(['categories'])
    }
};
</script>

<style>
.tiles {
    overflow: hidden;
}
</style>
