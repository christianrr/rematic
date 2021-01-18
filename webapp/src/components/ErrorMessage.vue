<template>
    <div v-show="showErrorMessage">
        <v-snackbar v-model="showErrorMessage" color="error" multi-line bottom :timeout="3000">
            <div v-if="error">
                <p class="mb-0" v-html="error"></p>
            </div>
            <v-btn text @click="showErrorMessage = false">Schließen</v-btn>
        </v-snackbar>
    </div>
</template>

<script>
import * as types from '@/store/mutation-types';

export default {
    name: 'ErrorMessage',
    computed: {
        showErrorMessage: {
            get() {
                return this.$store.state.error.showErrorMessage;
            },
            set(value) {
                this.$store.commit(types.SHOW_ERROR, value);
            }
        },
        error() {
            return this.$store.state.error.errorMessage;
        }
    },
    watch: {
        error() {
            setTimeout(() => {
                this.showErrorMessage = this.error !== null;
            }, 100);
        }
    }
};
</script>
