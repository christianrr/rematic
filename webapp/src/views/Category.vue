<template>
    <v-container class="pa-0">
        <v-row class="ma-0 pa-0">
            <v-col
                class="ma-0 pa-0"
                v-for="(item, index) in category.items"
                :key="item.name"
                :cols="
                    item.displayType === 'row' || item.displayType === 'free' || item.displayType === 'chart' ? 12 : 6
                "
                :md="item.displayType === 'row' || item.displayType === 'free' || item.displayType === 'chart' ? 12 : 3"
                :lg="item.displayType === 'row' || item.displayType === 'free' || item.displayType === 'chart' ? 12 : 2"
            >
                <ControlData
                    v-if="
                        item.displayType === 'free' &&
                            item.items &&
                            item.items.length >= 1 &&
                            item.items[0].source.startsWith('DATA:HTML')
                    "
                    :control="item.items[0]"
                />
                <Chart v-else-if="item.displayType === 'chart'" :controls="item.items" :title="item.name" />
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
import DeviceTile from '@/components/DeviceTile.vue';
import ControlData from '@/components/ControlData.vue';
import Chart from '@/components/Chart.vue';

export default {
    name: 'Category',
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
        ...mapGetters(['category'])
    },
    watch: {
        '$route.path': {
            handler() {
                this.setCategory(this.$route.params.title);
            }
        }
    },
    created() {
        this.setCategory(this.$route.params.title);
    },
    methods: {
        ...mapActions(['setCategory'])
    }
};
</script>
