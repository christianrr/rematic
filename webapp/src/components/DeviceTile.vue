<template>
    <v-container fluid class="pa-0 my-0 device-tile" :style="cssVars">
        <v-card
            class="fill-height fill-width ma-0 pa-0 d-flex flex-column justify-center"
            :ripple="!controls || controls.length === 0"
            flat
            @click="onCardClicked"
        >
            <div class="d-flex flex-column align-center">
                <v-img :src="publicPath + icon" width="35" height="35" contain v-if="icon && icon.indexOf('fas') < 0" />
                <v-icon color="black" class="tile-icon" v-else>{{ icon }}</v-icon>
                <h3 class="mt-1">{{ title }}</h3>
                <p class="accent--text my-0" v-if="status">
                    <Control :control="status" :forceStatus="true" class="fill-width text-center status-tile" />
                </p>
                <div class="mb-1" v-else />
                <div
                    class="ma-0 pa-0 d-flex flex-row align-center"
                    align-self="center"
                    v-if="controls && controls.length > 0"
                >
                    <div class="controls d-flex flex-column justify-center" v-if="isLoading">
                        <v-progress-circular indeterminate color="grey lighten-2" />
                    </div>
                    <Control
                        v-for="item in controls"
                        :key="item.title"
                        :control="item"
                        class="ml-2 controls d-flex flex-row align-center"
                        v-else
                    />
                </div>
                <slot></slot>
            </div>
        </v-card>
    </v-container>
</template>

<script>
import router from '@/router';
import Control from '@/components/Control.vue';

export default {
    name: 'DeviceTile',
    components: {
        Control
    },
    props: {
        title: String,
        icon: String,
        isLoading: Boolean,
        to: String,
        items: Array,
        index: Number
    },
    data: () => ({
        publicPath: process.env.BASE_URL,
        isOuterLeft: false
    }),
    computed: {
        status() {
            if (!this.items) return undefined;
            return this.items.find(item => item.displayType === 'status');
        },
        controls() {
            if (!this.items) return [];
            return this.items.filter(item => item.displayType === 'control' || !item.displayType);
        },
        cssVars() {
            return {
                '--border-left': (this.isOuterLeft ? '2px' : '0px'),
            }
        }
    },
    created() {
        this.onResize();
        window.addEventListener('resize', this.onResize, { passive: true });
    },
    methods: {
        onCardClicked() {
            if (this.to) router.push(this.to);
        },
        onResize() {
            if (this.$vuetify.breakpoint.name == 'xs') {
                if(this.index === 0 || (this.index) % 2 === 0) this.isOuterLeft = true;
            } else if (this.$vuetify.breakpoint.name == 'sm') {
                if(this.index === 0 || (this.index) % 3 === 0) this.isOuterLeft = true;
            } else if (this.$vuetify.breakpoint.name == 'md') {
                if(this.index === 0 || (this.index) % 4 === 0) this.isOuterLeft = true;
            } else if (this.$vuetify.breakpoint.name == 'lg' || this.$vuetify.breakpoint.name == 'xl') {
                if(this.index === 0 || (this.index) % 6 === 0) this.isOuterLeft = true;
            }            
        },
    }
};
</script>

<style>
.device-tile {
    border-left: var(--border-left) solid #eeeeee !important;
    border-right: 2px solid #eeeeee !important;
    border-bottom: 2px solid #eeeeee !important;
    height: 170px;
}

.device-tile .tile-icon {
    font-size: 30px;
}

.controls {
    height: 45px;
}

.status-tile p {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 160px;
}

.device-tile-right-overlay {
    width: 2px;
    height: 100%;
    right: 0;
    background-color: red;
}
</style>
