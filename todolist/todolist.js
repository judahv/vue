Vue.component('todo-entry',{
	template: '<form @submit.prevent="" class="entry">' +
	'<input type="text" placeholder="todo入力" v-model="text"><button type="submit" @click="enterButton">追加</button>' +
  '</form>',
  props: ['items'],
  data() {
    return {
      text: ''
    }
  },
  methods: {
    enterButton() {
      this.$emit('add', this.text);
      this.text = '';
    }
  }
})

Vue.component('todo',{
	template: '<ul class="list">' +
	'<li v-for="item in items" :key="item.id">{{item.text}}<button type="button" @click="deleteButton(item.id)">削除</button></li>' +
  '</ul>',
  props: ['items'],
  methods: {
    deleteButton(id) {
      console.log(id);
      this.$emit('delete', id);
    }
  }
})

new Vue({
  el: '#app',
  data: {
    list: [
      { id: 0 , text: '最初の1件です。' }
    ],
    id: Number
  },
  created() {
    this.id = this.list.length;
  },
  methods: {
    addList(text) {
      this.id++;
      this.list.push({ id:this.id, text: text });
      console.log(this.list);
    },
    deleteList(id) {
      id--;
      this.list.splice(id, 1);
      console.log(this.list);
    }
  }
})