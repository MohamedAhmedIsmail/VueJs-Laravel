
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
              let arr = that.optionData[index].split('-');
              if (arr[0] == 'true') {
                  that.axios.get("options-child/" + arr[4] + '/' + arr[1]).then(function (response) {

                      Vue.set(that.optionsChildChild, index, response.data);
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
                let arrData = that.optionData[index].split("-");
                if(arrData[2] == 'Other')
                {
                    that.inputOther[index] = 1;
                }
                else
                {
                    that.inputOther[index] = 0;
                }
                if(arrData[0] == "true")
                {
                    that.axios.get("options-child/"+arrData[4]+'/'+arrData[1]).then(function (response) {
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
            that.axios.get("properties/"+that.subCategory_id.id).then(function (response) {
                that.properties = response.data;
                let selectObject = {
                    'child':false,
                    'id':-1,
                    'name':'Select Value',
                    'parent':-1,
                    'slug':'select value'
                };
                let object = {
                  'child':false,
                    'id':0,
                    'name':'Other',
                    'parent':0,
                    'slug':'other'
                };
                for(let i =0; i<that.properties.length;i++)
                {
                    that.properties[i].options.push(selectObject);
                    that.properties[i].options.push(object);
                }
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
                that.subCategory_id='',
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
        handleCategoryData()
        {
            let object=[];
            for(let i =0;i<this.categories.length;i++)
            {
                object.push({'id':this.categories[i].id,'name':this.categories[i].name});
            }
            return object;
        },
        async create()
        {
            let that = this;
            this.form.categoryName = this.subCategories.name;
            this.form.subCategoryName = this.subCategory_id.name;
            this.form.options = [];
            this.form.other = this.inputOtherString;
           let index = 0;
            for(const item in this.optionData)
            {
                let arrSplit = this.optionData[item].split("-");
                let object = {
                    'child':arrSplit[0],
                    'option_id':arrSplit[1],
                    'property_name':arrSplit[3],
                    'value':arrSplit[2],
                    'index':arrSplit[4],
                }
                if(object.property_name!='Select Value') {
                    this.form.options.push(object);
                }
                index++;
            }
            console.log(this.form);
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
                        <FormValidation :errors="errors" />
                        <form class="needs-validation" @submit.prevent="create">
                            <fieldset :disabled="submitted || pending">

                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label>Main Category</label>
                                            <v-select v-model="subCategories" label="name" :options="categories" @input="getCategories($event)"></v-select>

                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label>Sub Category</label>
                                            <v-select v-model="subCategory_id" label="name" :options="subCategories.children" @input="onChange($event)"></v-select>

                                        </div>
                                    </div>
                                </div>

                                <div class="row" v-for="(property,index) in properties" >
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label>{{property.name}}</label>
                                            <v-select v-model="optionData[index]" label="name" :options="property.options" :reduce="option => `${option.child}-${option.id}-${option.name}-${property.name}-${index}`"   @input="getChildOptions($event)" return-object>
                                                <template v-slot:option="option"> {{option.name}} </template>
                                            </v-select>

                                            <label v-if="inputOther[index]==1">Other Input</label>
                                            <input v-model="inputOtherString[index]" type="text" class="form-control" v-if="inputOther[index]==1">
                                            <label v-if="optionsChild[index].property_id==index">{{optionsChild[index].name}}</label>

                                            <v-select v-if="optionsChild[index].property_id==index" v-model="optionData[optionsChild[index].id]" label="name" :options="optionsChild[index].options" :reduce="option => `${option.child}-${option.id}-${option.name}-${optionsChild[index].name}-${index}`"   @input="getChildChildOptions($event)" return-object>
                                                <template v-slot:option="option"> {{option.name}} </template>
                                            </v-select>

                                            <label v-if="optionsChildChild[optionsChild[index].id] && optionsChildChild[optionsChild[index].id].property_id==index">{{optionsChildChild[optionsChild[index].id].name}}</label>

                                            <v-select v-if="optionsChildChild[optionsChild[index].id] && optionsChildChild[optionsChild[index].id].property_id==index" v-model="optionData[optionsChildChild[optionsChild[index].id].id]" label="name" :options="optionsChildChild[optionsChild[index].id].options" :reduce="option => `${option.child}-${option.id}-${option.name}-${optionsChildChild[optionsChild[index].id].name}-${index}`">
                                                <template v-slot:option="option"> {{option.name}} </template>
                                            </v-select>


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
<style>
    .style-chooser  {
        appearance: none;
        background-color: transparent;
        border: none;
        padding: 0 1em 0 0;
        margin: 0;
        width: 100%;
        font-family: inherit;
        font-size: inherit;
        cursor: inherit;
        line-height: inherit;
    }

    .style-chooser .vs__clear,
    .style-chooser .vs__open-indicator {
        fill: #394066;
    }
</style>
