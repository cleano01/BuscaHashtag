<template>
    <a-locale-provider :locale="locale">

      <div id="app">
          <router-view></router-view>
      </div>
    </a-locale-provider>
</template>

<script>
import ptBR from 'ant-design-vue/lib/locale-provider/pt_BR';
export default {
  data(){
    return {
      locale: ptBR
    };
  }
}
</script>

<style>


</style>
