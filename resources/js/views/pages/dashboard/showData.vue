<script>
    import Layout from "../../layout/mainLayout.vue";
    import PageHeader from "@/components/page-header";
    /*
     * Dashboard page
     */
    export default {
        components: {
            Layout,
            PageHeader,
        },

        data() {

            return {
                title: this.$t('message.main'),
                errors: null,
                submitted: false,
                pending: false,
                data:[]
            };
        },
        methods: {
            async getData()
            {
                let that = this;
                that.pending = true;
                await that.axios.get("getData").then(function (response) {
                    that.pending = false;
                    that.data = response.data;
                }).catch(function(error){
                    that.submitted = false;
                    that.hasResult = false;
                    if (error.response) {
                        that.errors = error.response.data.errors;
                        window.scrollTo(0,0);
                    }
                });
            },

        },
        created() {
            this.getData()
        },
    };
</script>

<template>
    <Layout>
        <PageHeader :title="title" />
        <div class="row">
            <div class="col-12">
                <div class="card" id="error_area">
                    <div class="card-body">
                        <table class="table table-bordered table-hover" ref="table1">

                            <thead>
                            <tr>
                                <th class="text-center">Key</th>
                                <th class="text-center">Value</th>
                            </tr>
                            </thead>
                            <tbody>

                            <!-- rent payments -->
                            <tr v-for="value in data">
                                <td class="text-center">{{value['key']}}</td>
                                <td class="text-center">{{value['value']}}</td>
                               </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>
