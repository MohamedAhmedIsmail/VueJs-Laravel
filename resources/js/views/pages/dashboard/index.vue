<script>
import Layout from "../../layout/mainLayout.vue";
import PageHeader from "@/components/page-header";
import RecursiveOptions from "./recursiveOptions.vue";
/*
 * Dashboard page
 */
export default {
  components: {
      Layout,
      PageHeader,
      RecursiveOptions
  },

  data() {

    return {
        title: this.$t('message.main'),
        subCategories:'',
        subCategory_id:'',
        errors: null,
        submitted: false,
        pending: false,
        categories:[],
        properties:[],
        optionData:{},
        optionsChild:{},
        selectIDs:[],
        inputOther:[],
        inputOtherString:[],
        form:{}

    };
  },
    methods: {
        async getChildOptions(event)
        {
            let that = this;
            let count = 0;
            for(let i =0; i<100;i++)
            {
                that.inputOther[i] = 0;
            }
            for(const index in that.optionData)
            {
                if(that.optionData[index].value == 'Other')
                {
                    that.inputOther[index] = 1;
                }
                if(that.optionData[index].child == true)
                {
                    await that.axios.get("options-child/"+that.optionData[index].index+'/'+that.optionData[index].option_id).then(function (response) {
                        that.optionsChild = response.data;
                        that.pending = false;
                    });

                }
                count++;
            }
        },
        async onChange(event)
        {
            let that = this;
            that.pending = true;
            await that.axios.get("properties/"+that.subCategory_id.subCategory).then(function (response) {
                that.properties = response.data;
                that.pending = false;
            });
        },
        async getCategories() {
            let that = this;
            that.pending = true;
            await that.axios.get("categories").then(function (response) {
                that.pending = false;
                that.categories = response.data;
            });
        },
        async create()
        {
            let that = this;
            console.log(this.subCategories);
            console.log(this.subCategory_id);
            console.log(this.optionData);
            console.log(this.inputOtherString);
            this.form.categoryName = this.subCategories.name;
            this.form.subCategoryName = this.subCategory_id.name;
            this.form.options = [];
            this.form.other = this.inputOtherString;
           let index = 0;
            for(const item in this.optionData)
            {
                this.form.options[index] = this.optionData[item];
                index++;
            }
            await that.axios.post( 'postData', this.form).then(function(res)
            {
                that.submitted = false;
                that.$router.push({ name: 'data'});
            })
                .catch(function(error)
                {
                    that.submitted = false;
                    if (error.response)
                    {
                        that.errors = error.response.data.errors;
                        window.scrollTo(0,0);
                    }
                });
        }

    },
    created() {
        this.getCategories();
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
                        <FormValidation :errors="errors" />
                        <form class="needs-validation" @submit.prevent="create">
                            <fieldset :disabled="submitted || pending">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label>Main Category</label>
                                            <select
                                                v-model="subCategories"
                                                class="custom-select" required>
                                                <option disabled selected>Choose Main Category</option>
                                                <option v-bind:value="{ category_id: category.id, children: category.children,name:category.name }" v-for="category in categories" :key="category.id">
                                                    {{ category.name }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label>Sub Category</label>
                                            <select
                                                @change="onChange($event)"
                                                v-model="subCategory_id"
                                                class="custom-select" required>
                                                <option disabled selected>Choose Sub Category</option>
                                                <option :value="{subCategory:sub.id,name:sub.name}" v-for="sub in subCategories.children" :key="sub.id">
                                                    {{ sub.name }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row" v-for="(property,index) in properties" >
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label>{{property.name}}</label>
                                            <select @change="getChildOptions($event)" v-model="optionData[index]" class="custom-select" >
                                                <option v-bind:value="{
                                                option_id: option.id,
                                                child:option.child,
                                                value:option.name,
                                                index:index,
                                                property_name:property.name
                                                }" v-for="option in property.options" :key="option.id">
                                                    {{ option.name }}
                                                </option>
                                                <option v-bind:value="{value:'Other',property_name:property.name,index:index,}">Other</option>
                                            </select><br>
                                            <input v-model="inputOtherString[index]" type="text" class="form-control" v-if="inputOther[index]==1">
<!--                                            <label v-if="optionsChild.length!=0 && optionsChild.property_id==index">{{optionsChild.name}}</label>-->
<!--                                            <select v-if="optionsChild.length!=0 && optionsChild.property_id==index" @change="getChildOptions($event)" v-model="optionData[index]" class="custom-select" required >-->
<!--                                                <option v-bind:value="{ option_id: option.id,child:option.child,value:option.name,index:index }" v-for="option in optionsChild.options" :key="option.id">-->
<!--                                                    {{ option.name }}-->
<!--                                                </option>-->
<!--                                            </select><br>-->

                                            <RecursiveOptions :optionsChild="optionsChild" :optionData="optionData" :index="index"></RecursiveOptions>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12 mt-4 text-right">
                                    <button class="btn btn-primary w-md waves-effect waves-light" type="submit">
                                        <span v-show="submitted || pending" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        <span v-show="!submitted && !pending">{{$t('message.save')}}</span>
                                    </button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>
