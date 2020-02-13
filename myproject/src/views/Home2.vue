<template>
  <div>
    
    <NavBar></NavBar>

    <div class="container">
      <div class="row ">
        <div class="col">

          <p>{{ teste }}</p>

         
                 <a-form :form="form" @submit="handleSubmit" class=" col-xs-12 col-lg-12">
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
        <a-table :columns="columns" :dataSource="data" @change="onChange" />
      </div>
        
      </div>
    </div>
    

  </div>
</template>

<script>
import NavBar from '../componentes/NavBar'
import axios from 'axios'

let id = 0;


const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
          {
          text: '#flamengo',
          value: '#flamengo',
        },
        {
          text: 'jim',
          value: 'jim',
        },
        {
          text: 'Submenu',
          value: 'Submenu',
          children: [
            {
              text: 'Green',
              value: 'Green',
            },
            {
              text: 'Black',
              value: 'Black',
            },
          ],
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Age',
      dataIndex: 'age',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      filters: [
        {
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
        {
          text: '#flamengo',
          value: '#flamengo',
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.address.indexOf(value) === 0,
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address:  '#flamengo',
    },
    {
      key: '2',
      name: '#flamengo h dsadaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      age: 42,
      address: ' aninhos do mini flamenguista Arthur! #festaflamengo #flamengo #fla #nacaorubronegra #otopatamar #futebol #festafutebol',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park #flamengo',
    },
  ];

  function onChange(pagination, filters, sorter) {
    console.log('params', pagination, filters, sorter);
  }

export default {
  components: {
    NavBar
  },

  data() {
    return {
      teste: [],
      
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
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
      data,
        columns,
    };
  },

  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'dynamic_form_item' });
    this.form.getFieldDecorator('keys', { initialValue: [], preserve: true });
  },
  
  methods: {
     onChange,
    remove(k) {
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

    add() {
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

    handleSubmit(e) {
      console.log('ok')
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          axios
          .get('http://localhost:3000/api/hashtag/parar')
          .then(response => {
            //mensagem, autor, data de publicação
            response.data.map((item) =>{
              if(item !== null){
                this.teste.push({
                  'id': item.id,  
                  'nome':item.user.name,
                  'msg':item.text,
                  'data': item.user.created_at
                })
                console.log(item)
              }
            })
            alert(response.data[0].length )
          })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
       }
        
      }
      
      );
    },

  
  },

  

}
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





</style>
