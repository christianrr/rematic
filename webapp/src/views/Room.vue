<template>
    <v-container class="pa-0">
        <v-row class="ma-0 pa-0">
            <v-col
                class="ma-0 pa-0"
                v-for="(item, index) in room.items"
                :key="item.name"
                :cols="item.displayType === 'row' || item.displayType === 'free' || item.displayType === 'chart' ? 12 : 6"
                :md="item.displayType === 'row' || item.displayType === 'free' || item.displayType === 'chart' ? 12 : 3"
                :lg="item.displayType === 'row' || item.displayType === 'free' || item.displayType === 'chart' ? 12 : 2"
            >
                <ControlData v-if="item.displayType === 'free' && item.items && item.items.length >= 1 && item.items[0].source.startsWith('DATA:HTML')" />
                <Chart
                    v-if="item.displayType === 'chart' && item.items && item.items.length >= 1 && item.items[0].data"
                    :controls="item.items"
                    :title="item.name"
                />
                <DeviceRow
                    :title="item.name"
                    :icon="item.icon"
                    :isLoading="item.isLoading"
                    :items="item.items"
                    :to="item.link"
                    v-else-if="item.displayType === 'row'"
                />
                <DeviceTile
                    :title="item.name"
                    :icon="item.icon"
                    :isLoading="item.isLoading"
                    :items="item.items"
                    :to="item.link"
                    :index="index"
                    v-else
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import DeviceRow from '@/components/DeviceRow.vue';
import DeviceTile from '@/components/DeviceRow.vue';
import Chart from '@/components/Chart.vue';
import ControlData from '@/components/ControlData.vue';

export default {
    name: 'Room',
    components: {
        DeviceRow,
        DeviceTile,
        Chart,
        ControlData
    },
    data() {
        return {};
    },
    computed: {
        ...mapGetters(['room'])
    },
    watch: {
        '$route.path': {
            handler() {
                this.setRoom(this.$route.params.title);
            }
        }
    },
    created() {
        this.setRoom(this.$route.params.title);
    },
    methods: {
        ...mapActions(['setRoom'])
    }
};
</script>
