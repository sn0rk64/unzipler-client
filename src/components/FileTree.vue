<template>
    <v-container class="uzp__container" mt-0>
        <v-row no-gutters>
            <v-card
                class="mx-auto"
                width="100%"
            >
<!--                <v-sheet class="pa-4 primary lighten-2">-->
<!--                    <v-text-field-->
<!--                        v-model="search"-->
<!--                        label="Search"-->
<!--                        dark-->
<!--                        flat-->
<!--                        solo-inverted-->
<!--                        hide-details-->
<!--                        clearable-->
<!--                        clear-icon="mdi-close-circle-outline"-->
<!--                    ></v-text-field>-->
<!--                </v-sheet>-->
                <v-card-text v-if="unarchivedFiles.length > 0">
                    <v-treeview
                        :items="unarchivedFiles"
                        :search="search"
                        open-on-click
                        open-all
                    >
                        <template v-slot:prepend="{ item, open }">
                            <v-icon v-if="!item.file">
                                {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
                            </v-icon>
                            <v-icon v-else>
                                {{ fileTypes[item.file] }}
                            </v-icon>
                        </template>
                    </v-treeview>
                </v-card-text>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "FileTree",
        props: {
            unarchivedFiles: Array,
        },
        data: () => ({
            fileTypes: {
                html: 'mdi-language-html5',
                js: 'mdi-nodejs',
                json: 'mdi-json',
                md: 'mdi-markdown',
                pdf: 'mdi-file-pdf',
                png: 'mdi-file-image',
                jpg: 'mdi-file-image',
                txt: 'mdi-file-document-outline',
                xls: 'mdi-file-excel',
            },
            search: null,
        }),
    }
</script>

<style scoped>

</style>