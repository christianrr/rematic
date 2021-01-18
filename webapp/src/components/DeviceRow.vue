<template>
    <v-container fluid class="ma-0 pa-0">
        <v-row :class="to ? 'ma-0 pa-0 device-row cursor-pointer': 'ma-0 pa-0 device-row'" @click="onCardClicked">
            <v-col cols="12" class="ma-0 pa-2 d-flex flex-row align-center justify-start" align-self="center">
                <div class="icon-container mx-4 d-flex flex-row align-center justify-center">
                    <v-img
                        :src="publicPath + icon"
                        width="35"
                        height="35"
                        contain
                        v-if="icon && icon.indexOf('fas') < 0"
                    />
                    <v-icon color="grey darken-1" v-else>{{ icon }}</v-icon>
                </div>
                <div>
                    <h4>{{ title }}</h4>
                    <p class="accent--text my-0" v-if="status">
                        <Control :control="status" :forceStatus="true" />
                    </p>
                </div>
                <div class="ml-2 pr-3 flex-grow-1 d-flex flex-row align-center justify-end">
                    <div class="controls d-flex flex-column justify-center" v-if="isLoading">
                        <v-progress-circular indeterminate color="grey lighten-2" />
                    </div>
                    <Control
                        v-for="item in controls"
                        :key="item.iseId"
                        :control="item"
                        class="ml-2 controls d-flex flex-row align-center"
                        v-else
                    />
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import router from '@/router';
import Control from '@/components/Control.vue';

export default {
    name: 'DeviceRow',
    components: {
        Control
    },
    props: {
        title: String,
        icon: String,
        isLoading: Boolean,
        to: String,
        items: Array
    },
    data: () => ({
        publicPath: process.env.BASE_URL
    }),
    computed: {
        status() {
            if (!this.items) return undefined;
            return this.items.find(item => item.displayType === 'status');
        },
        controls() {
            if (!this.items) return [];
            return this.items.filter(item => item.displayType === 'control' || !item.displayType);
        }
    },
    methods: {
        onCardClicked() {
            if (this.to) router.push(this.to);
        }
    }
};
</script>

<style>
.device-row {
    border-bottom: 2px solid #eeeeee !important;
    height: 80px;
}

.device-row .icon-container {
    float: left;
    width: 30px;
}

.controls {
    height: 45px;
}

</style>
