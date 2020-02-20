<template>
    <div>
        <Navigation />
        <v-app id="inspire">
            <FileUpload
                v-on:set-unarchived-files="setUnarchivedFiles"
            />
            <FileTree
                v-bind:unarchived-files="unarchivedFiles"
            />
        </v-app>
        <Footer/>
    </div>
</template>

<script>
    import Navigation from "./Navigation";
    import FileUpload from "./FileUpload";
    import FileTree from "./FileTree";
    import Footer from "./Footer";

    export default {
        name: 'Index',
        components: {
            Footer,
            FileTree,
            Navigation,
            FileUpload
        },
        methods: {
            setUnarchivedFiles(v) {
                this.unarchivedFiles = v
            }
        },
        data: () => ({
            unarchivedFiles: []
        })
    }
</script>