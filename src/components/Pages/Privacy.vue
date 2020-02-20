<template>
    <div>
        <Navigation/>
        <v-app id="inspire">
            <v-container class="uzp__container">
                <v-row no-gutters>
                    <p class="uzp__headline">Privacy</p>
                    <p>
                        test
                    </p>
                </v-row>
            </v-container>
        </v-app>
        <Footer/>
    </div>
</template>

<script>
    import Navigation from "../Navigation";
    import Footer from "../Footer";
    export default {
        name: "Privacy",
        components: {Footer, Navigation}
    }
</script>

<style scoped>

</style>