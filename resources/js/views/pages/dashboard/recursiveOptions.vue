<template>
    <div>
        <div >
            <label v-if="optionsChild.length!=0 && optionsChild.property_id==index">{{optionsChild.name}}</label>
            <select v-if="optionsChild.length!=0 && optionsChild.property_id==index" @change="getChildOptions($event)" v-model="somedataCopy[index]" class="custom-select" >
                <option v-bind:value="{ option_id: option.id,child:option.child,value:option.name,index:index,property_name: optionsChild.name}" v-for="option in optionsChild.options" :key="option.id">
                    {{ option.name }}
                </option>
            </select>
            <RecursiveOptions v-for="option in optionsChild.options" :key="option.id" v-if="option.child==true && optionsChild.id==option.parent" :optionsChild="somedataNew" :optionData="somedataCopy"/>
        </div>
        <div>
            <label v-if="somedataNew.length!=0 && somedataNew.property_id==index">{{somedataNew.name}}</label>
            <select v-if="somedataNew.length!=0 && somedataNew.property_id==index" @change="getChildOptions($event)" v-model="somedataCopy[index]" class="custom-select" >
                <option v-bind:value="{ option_id: option.id,child:option.child,value:option.name,index:index,property_name: somedataNew.name }" v-for="option in somedataNew.options" :key="option.id">
                    {{ option.name }}
                </option>
            </select>
        </div>
    </div>
</template>

<script>
    import {fetchComponentData} from "@/helpers/crud-func";
    export default {
        name: "RecursiveOptions",
        props: {
            optionsChild: Object,
            optionData:Object,
            index:{
                type: Number,
                default:0
            },
        },
        data() {
            return {
                newIndex:this.index,
                inputOther:[],
                somedataCopy: this.optionData,
                somedataNew:{}
            };
        },

        methods: {
            async getChildOptions(event)
            {
                this.newIndex+=1;
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
                            that.somedataNew = response.data;
                            that.pending = false;
                        });
                    }
                    count++;
                }
            },
        },
    };
</script>
<style scoped>
    .node {
        /*text-align: left;*/
        font-size: 18px;
    }
    .type {
        margin-right: 10px;
    }
</style>
