<template>
    <v-container class="text-center uzp__container">
        <v-row no-gutters>
            <p class="uzp__headline">Fast.Real-time.Secure.</p>
            <p class="uzp__subhead">Supported types: .zip .rar</p>
            <form
                class="box has-advanced-upload"
                method="post"
                action=""
                enctype="multipart/form-data"
                ref="fileForm"
            >
                <div class="box__input">
                    <v-icon size="100" class="box__icon">mdi-file-upload-outline</v-icon>
                    <input @change="uploadFile($event)" class="box__file" type="file" id="file"/>

                    <label for="file">
                        <div v-if="file === null">
                            <strong>Choose a file</strong><span class="box__dragndrop"> or drag it here</span>.
                        </div>
                        <div v-else>
                            {{ file.name }}
                        </div>
                    </label>
                </div>
            </form>
        </v-row>
    </v-container>
</template>

<script>
    import axios from 'axios'
    import helperMixin from "../mixins/helperMixin";
    import FileTree from "./FileTree";

    export default {
        name: 'FileUpload',
        mixins: [helperMixin],
        data: () => ({
            file: null,
            fileTree: {},
            normalizedFileTree: {},
            allowedFileTypes: [
                'application/zip',
                'application/x-zip-compressed',
                'application/x-rar-compressed'
            ]
        }),
        methods: {
            determineDragAndDropCapable(){
                let div = document.createElement('div');
                return (( 'draggable' in div )
                    || ('ondragstart' in div && 'ondrop' in div ))
                    && 'FormData' in window
                    && 'FileReader' in window
            },
            normalizeChildren(nextChildren, normalized, counter) {
                for (let dir of Object.values(nextChildren)) {
                    counter++

                    let tmp = {
                        id: counter,
                        name: dir.name,
                        children: []
                    }

                    for (let [fname, finfo] of Object.entries(dir.files)) {
                        counter++

                        tmp.children.push({
                            id: counter,
                            name: fname,
                            file: finfo.ext
                        })
                    }

                    normalized.push(tmp)
                    this.normalizeChildren(dir.children, tmp.children, counter)
                }
            },
            normalizeFileTree(fileTree) {
                let normalized = {
                    id: 0,
                    name: fileTree.name,
                    children: []
                }

                this.normalizeChildren(fileTree.children, normalized.children, 1)

                this.normalizedFileTree = normalized
                this.$emit('set-unarchived-files', [this.normalizedFileTree])
            },
            uploadFile(file) {
                const data = new FormData()

                data.append('archive', file)

                axios.post('http://localhost:8080/handleArchive', data)
                    .then((response) => {
                        this.fileTree = response.data
                        this.normalizeFileTree(this.fileTree)
                    })
                    .catch((error) => {
                    // eslint-disable-next-line console.log,no-console
                    console.log(error)
                })
            },
            handleFile(e) {
                let files = e.target.files || e.dataTransfer.files
                if (!files.length) {
                    return false
                }

                if (!this.isFileAllowed(files[0])) {
                    this.file = null
                    this.$toast.error('Invalid file. Supported types: .zip .rar')
                    return false
                }

                this.file = files[0]
                this.uploadFile(this.file)
                let toast = this.$toast.getCmp()
                if (toast) {
                    toast.close()
                }
            },
            isFileAllowed(file) {
                return this.allowedFileTypes.includes(file['type'])
            },
            activateDragAndDrop() {
                this.dragAndDropCapable = this.determineDragAndDropCapable();
                if (this.dragAndDropCapable) {
                    ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach((evt) => {
                        this.$refs.fileForm.addEventListener(evt, (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        });
                    });

                    this.$refs.fileForm.addEventListener('drop', this.handleFile)
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.activateDragAndDrop()
            })
        }
    }
</script>

<style scoped>
    .box.has-advanced-upload {
        outline: 2px dashed #212121;
        outline-offset: -10px;
        -webkit-transition: outline-offset .15s ease-in-out, background-color .15s linear;
        transition: outline-offset .15s ease-in-out, background-color .15s linear;
        width: 100%;
    }

    .box {
        font-size: 1.25rem;
        position: relative;
        padding: 30px 20px;
    }

    .box.has-advanced-upload .box__icon {
        width: 100%;
        height: 100px;
        display: block;
        margin-bottom: 30px;
    }

    .box__file {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
    }

    .box__file + label {
        max-width: 80%;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
        display: inline-block;
        overflow: hidden;
    }

    .box.has-advanced-upload .box__dragndrop {
        display: inline;
    }
</style>