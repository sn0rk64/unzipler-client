<template>
    <v-toolbar>
        <router-link to="/">
            <v-img
            class="mx-2"
            src="https://i.imgur.com/qgGY4tB.png"
            max-height="40"
            max-width="40"
            contain
            ></v-img>
        </router-link>
        <v-toolbar-title><router-link to="/">Unzipler</router-link></v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items>
            <v-btn
                v-for="(route, key) in routes"
                :key="key"
                :to="{ name: route.to }"
                text
            >
               {{ route.title }}
            </v-btn>
        </v-toolbar-items>

    </v-toolbar>
</template>

<script>
    export default {
        name: "Navigation",
        data() {
            return {
                routes: [
                    {
                        title: 'About',
                        to: 'about'
                    },
                    {
                        title: 'Privacy',
                        to: 'privacy'
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>
