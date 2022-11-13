
<script>
import Layout from "../../layout/mainLayout.vue";
import PageHeader from "@/components/page-header";
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
// import RecursiveOptions from "./recursiveOptions.vue";
import Vue from 'vue';
/*
 * Dashboard page
 */
export default {
  components: {
      Layout,
      PageHeader,
      // RecursiveOptions,
      vSelect,
      Vue
  },

  data() {

    return {
        title: this.$t('message.main'),
        subCategories:'',
        subCategory_id:'',
        errors: null,
        submitted: false,
        pending: false,
        sizes: ['Small', 'Medium', 'Large', 'Extra Large'],
        categories:[],
        properties:[],
        optionData:{},
        optionsChild:[],
        optionsChildChild:[],
        inputOther:[],
        inputOtherString:[],
        form:{}

    };
  },

    methods: {
      async getChildChildOptions(event)
      {
          let that = this;
          for(const index in that.optionData) {
              if (that.optionData[index].child == true) {
                  console.log(that.optionData);
                  that.axios.get("options-child/" + that.optionData[index].index + '/' + that.optionData[index].option_id).then(function (response) {

                      // that.optionsChild[index] = response.data;
                      Vue.set(that.optionsChildChild, index, response.data);
                      console.log(that.optionsChildChild);
                      that.pending = false;
                  });

              }
          }
      },
        async getChildOptions(event)
        {
            let that = this;

            for(const index in that.optionData)
            {
                if(that.optionData[index].value == 'Other')
                {
                    that.inputOther[index] = 1;
                }
                else
                {
                    that.inputOther[index] = 0;
                }
                if(that.optionData[index].child == true)
                {
                    that.axios.get("options-child/"+that.optionData[index].index+'/'+that.optionData[index].option_id).then(function (response) {

                         // that.optionsChild[index] = response.data;
                         Vue.set(that.optionsChild,index,response.data);
                        that.pending = false;
                    });

                }
            }
        },
        async onChange(event)
        {
            let that = this;
            that.properties=[],
            that.optionData={},
            that.inputOther=[],
            that.optionsChild=[],
            that.inputOtherString=[],
            that.pending = true;
            that.axios.get("properties/"+that.subCategory_id.subCategory).then(function (response) {
                that.properties = response.data;
                that.pending = false;
                for(let i =0; i<100;i++)
                {
                    that.optionsChild[i] = {};
                    that.optionsChildChild[i] = {};

                }
            });
        },
        async getCategories()
        {

                let that = this;

                that.properties=[],
                that.optionData={},
                that.optionsChild=[],
                that.inputOther=[],
                that.inputOtherString=[],
                that.pending = true;
                that.axios.get("categories").then(function (response) {
                that.pending = false;
                that.categories = response.data;
                for(let i =0; i<100;i++)
                {
                    that.inputOther[i] = 0;
                }
            });
        },
        async create()
        {
            let that = this;
            this.form.categoryName = this.subCategories.name;
            this.form.subCategoryName = this.subCategory_id.name;
            this.form.options = [];
            this.form.other = this.inputOtherString;
           let index = 0;
           console.log(this.optionData);
            for(const item in this.optionData)
            {
                this.form.options.push(this.optionData[item]);
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
                                                autocomplete="on"
                                                @change="getCategories($event)"
                                                v-model="subCategories"
                                                 required>
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
                                                <option value="">Choose Option</option>
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
                                            </select>

                                            <label v-if="inputOther[index]==1">Other Input</label>
                                            <input v-model="inputOtherString[index]" type="text" class="form-control" v-if="inputOther[index]==1">
                                            <label v-if="optionsChild[index].property_id==index">{{optionsChild[index].name}}</label>

                                            <select v-if="optionsChild[index].property_id==index" @change="getChildChildOptions($event)" v-model="optionData[optionsChild[index].id]" class="custom-select" required >
                                                <option v-bind:value="{ option_id: option.id,
                                                child:option.child,
                                                value:option.name,
                                                index:index,
                                                 property_name:optionsChild[index].name}" v-for="option in optionsChild[index].options" :key="option.id">
                                                    {{ option.name }}
                                                </option>
                                            </select>
                                            <label v-if="optionsChildChild[optionsChild[index].id] && optionsChildChild[optionsChild[index].id].property_id==index">{{optionsChildChild[optionsChild[index].id].name}}</label>
                                            <select v-if="optionsChildChild[optionsChild[index].id] && optionsChildChild[optionsChild[index].id].property_id==index" v-model="optionData[optionsChildChild[optionsChild[index].id].id]" class="custom-select" required >
                                                <option v-bind:value="{ option_id: option.id,
                                                child:option.child,
                                                value:option.name,
                                                index:index,
                                                 property_name:optionsChildChild[optionsChild[index].id].name}" v-for="option in optionsChildChild[optionsChild[index].id].options" :key="option.id">
                                                    {{ option.name }}
                                                </option>
                                            </select>

                                            <!--                                            <RecursiveOptions :optionsChild="optionsChild" :optionData="optionData" :index="index"></RecursiveOptions>-->
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
