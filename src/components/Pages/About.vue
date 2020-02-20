<template>
    <div>
        <Navigation/>
        <v-app id="inspire">
            <v-container class="uzp__container">
                <v-row no-gutters>
                    <p class="uzp__headline">About us</p>
                    <p>
                        At unzip-online you can decompress .zip and .rar files without having to install software.
                        This makes unzip-online perfect for school and work where there is no decompress software installed in most cases.
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

        name: "About",
        components: {Footer, Navigation}
    }
</script>

<style scoped>

</style>