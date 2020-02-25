<template>
    <v-container class="uzp__container" mt-0>
        <v-row no-gutters>
            <v-card
                class="mx-auto"
                width="100%"
            >
                <v-card-text v-if="unarchivedFiles.length > 0">
                    <v-treeview
                        :items="unarchivedFiles"
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
                        <template v-slot:append="{ item, open }">
                            <v-icon v-if="item.file" class="download-btn" @click="downloadFile(item)">
                                {{ 'mdi-cloud-download' }}
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
        methods: {
            downloadFile(item) {
                fetch(item.to).then(function(t) {
                    return t.blob().then((b)=>{
                            let a = document.createElement("a");
                            a.href = URL.createObjectURL(b);
                            a.setAttribute("download", item.name);
                            a.click();
                        }
                    )
                }).catch((error) => {
                    this.$toast.error(error)
                });
            }
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
        }),
    }
</script>

<style scoped>
    .download-btn:hover {
        color: #03A9F4;
    }
</style>