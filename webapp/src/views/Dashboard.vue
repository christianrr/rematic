<template>
    <v-container class="pa-0">
        <v-row class="ma-0 pa-0">
            <v-col class="ma-0 pa-0" cols="6" md="3" lg="2" @click="onServerTileClicked">
                <DeviceTile title="Zentrale" icon="assets/Server.png" :index="0">
                    <div class="controls d-flex flex-column justify-center">
                        <p class="accent--text pa-0 ma-0">{{ $socket.connected ? 'verbunden' : 'getrennt' }}</p>
                    </div>
                </DeviceTile>
            </v-col>
            <v-col class="ma-0 pa-0" v-for="(item, index) in dashboard" :key="item.name" cols="6" md="3" lg="2">
                <DeviceTile
                    :title="item.name"
                    :icon="item.icon"
                    :isLoading="item.isLoading"
                    :to="item.link"
                    :items="item.items"
					:index="(index+1)"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import router from '@/router';
import DeviceTile from '@/components/DeviceTile.vue';

export default {
    name: 'Dashboard',
    components: {
        DeviceTile
    },
    computed: {
        ...mapGetters(['isConnected', 'dashboard', 'categories'])
    },
    async created() {
        //await this.getDashboard();
    },
    methods: {
        ...mapActions(['getDashboard', 'changeState']),
        update(control) {
            console.log('control updated: ' + JSON.stringify(control));
            this.changeState({ iseId: control.iseId, value: control.value });
        },
        onServerTileClicked() {
            if(!this.$socket.connected) return;
            var serverCategory = this.categories.find(c => c.name === 'Zentrale');
            if(serverCategory) router.push('/categories/Zentrale');
        }
    }
};
</script>

<style>
.controls {
    height: 45px;
}
</style>
