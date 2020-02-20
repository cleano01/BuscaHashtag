<template>
  <div>

   <NavBar></NavBar>

   <div v-show="status_req"  class="folder">
    <div class="row">
      <div class="col">
        <div class="example">
          <a-spin size="large" />
        </div>
      </div>
    </div>
  </div>

  <div  v-show="conteudo" class="container">
      <div class="row ">
        <div class="col">
        <a-form :form="form" @submit="handleSubmit" 
        class=" col-xs-12 col-lg-12">
          <a-form-item
            v-for="(k, index) in form.getFieldValue('keys')"
            :key="k"
            v-bind="index === 0 ? formItemLayout : formItemLayoutWithOutLabel"
            :label="index === 0 ? 'hashtags' : ''"
            :required="false"
          >
          <a-input
            v-decorator="[
              `names[${k}]`,
              {
                validateTrigger: ['change', 'blur'],
                  rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: 'Informe uma hashtag',
                  },
                ],
              },
            ]"
            placeholder="informe uma hashtag, exemplo #brasil"
            style="width: 60%; margin-right: 8px"
          />

          <a-icon
            v-if="form.getFieldValue('keys').length > 1"
            class="dynamic-delete-button"
            type="minus-circle-o"
            :disabled="form.getFieldValue('keys').length === 1"
            @click="() => remove(k)"
          />
          </a-form-item>
          
          <a-form-item v-bind="formItemLayoutWithOutLabel">
            <a-button type="dashed" style="width: 60%" @click="add">
              <a-icon type="plus" /> Add field
            </a-button>
          </a-form-item>

          <a-form-item v-bind="formItemLayoutWithOutLabel">
            <a-button type="primary" html-type="submit">
            Submit
            </a-button>
          </a-form-item>
        </a-form>
      </div>

   <div class="col"> 
    <a-table :dataSource="data" :columns="columns">
      <div
        slot="filterDropdown"
        slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
        style="padding: 8px"
      >
        <a-input
          v-ant-ref="c => searchInput = c"
          :placeholder="`Search ${column.dataIndex}`"
          :value="selectedKeys[0]"
          @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
          @pressEnter="() => handleSearch(selectedKeys, confirm)"
          style="width: 188px; margin-bottom: 8px; display: block;"
        />
        <a-button
          type="primary"
          @click="() => handleSearch(selectedKeys, confirm)"
          icon="search"
          size="small"
          style="width: 90px; margin-right: 8px"
          >Search</a-button
        >
        <a-button @click="() => handleReset(clearFilters)" size="small" style="width: 90px"
          >Reset</a-button
        >
      </div>
      <a-icon
        slot="filterIcon"
        slot-scope="filtered"
        type="search"
        :style="{ color: filtered ? '#108ee9' : undefined }"
      />
      <template slot="customRender" slot-scope="text">
        <span v-if="searchText">
          <template
            v-for="(fragment, i) in text.toString().split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
          >
          <mark
            v-if="fragment.toLowerCase() === searchText.toLowerCase()"
            :key="i"
            class="highlight"
            >{{fragment}}</mark
          >
          <template v-else
            >{{fragment}}</template
          >
          </template>
        </span>
        <template v-else
      >{{text}}</template
        >
      </template>
    </a-table>
      </div>        
    </div>
  </div>
  </div>
</template>

<script>
const data = [ ];

import NavBar from '../componentes/NavBar'
import axios from 'axios'

let id = 0;
  function onChange(pagination, filters, sorter) {
    console.log('params', pagination, filters, sorter);
  }

export default {
  components: {
    NavBar
  },

  data() {
    return {
      status_req:false,
      conteudo : true,
      data,
      searchText: '',
      searchInput: null,
      columns: [
        {
          title: 'Autor',
          dataIndex: 'name',
          key: 'name',
            
          onFilter: (value, record) => record.name.toString()
          .toLowerCase().includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
               }, 0);
            }
          },
        },

        {
          title: 'Mensagem',
          dataIndex: 'msg',
          key: 'msg',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) => record.msg.toString().
          toLowerCase().includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              });
            }
          },
        },

        {
          title: 'Publicação',
          dataIndex: 'date',
          key: 'date',
          
          onFilter: (value, record) => record.date.toString()
          .toLowerCase().includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              });
            }
          },
        },
      ],


      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCstatus_req_tabelaol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        },
      },     
    };
  },

  beforeCreate() {
    this.form = this.$form.createForm(this, 
    { name: 'dynamic_form_item' });
    this.form.getFieldDecorator('keys', 
    { initialValue: [], preserve: true });
  },
  
  methods: {
    onChange,
    remove(k){
      const { form } = this;
      // can use data-binding to get
      const keys = form.getFieldValue('keys');
      // We need at least one passenger
      if (keys.length === 1) {
        return;
      }

      // can use data-binding to set
      form.setFieldsValue({
        keys: keys.filter(key => key !== k),
      });
    },

    add(){
      const { form } = this;
      // can use data-binding to get
      const keys = form.getFieldValue('keys');
      const nextKeys = keys.concat(id++);
      // can use data-binding to set
      // important! notify form to detect changes
      form.setFieldsValue({
        keys: nextKeys,
      });
    },

    handleSubmit(e){
      e.preventDefault();
      this.form.validateFields((err, values) => {
        alert(values.names)
        if (!err) {
          this.status_req = true;
          this.conteudo = false
         axios
         .post('http://localhost:3000/api/hashtag/buscar', values.names)
         .then(response => {
           
           response.data.map((item) =>{
             if(item !== null){
              data.push({
                'id': item.id,  
                'name':item.user.name,
                'msg':item.text,
                'date': item.user.created_at
              })             
              }

            })
           this.status_req = false;  
           this.conteudo = true;
        })
      .catch(error => {        
        this.errored = true
        return error
      }) } });
    },


  /*table*/
  handleSearch(selectedKeys, confirm){
      confirm();
      this.searchText = selectedKeys[0];
  },
  handleReset(clearFilters) {
    clearFilters();
    this.searchText = '';
  },
      
  }// methods
}//export default
</script>


<style scoped >
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
  
}
.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
 }

.folder {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 2rem;
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  opacity: 1;  
}

.example {
  text-align: center;
  /* background: rgba(226, 217, 217, 0.192); */
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 30px 50px;
  margin: 20px 0;
}

</style>
