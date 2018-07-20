Vue.component('button-entry',{
  template: '<div class="button-entry"><button type="button" @click="show">新規追加</button></div>',
  methods: {
    show() {
      this.$emit('show');
    }
  }
})

Vue.component('todo-entry',{
	template: '<div class="bg-entry" v-if="show"><form @submit.prevent="" class="entry"><button type="button" @click="closeEntry" class="close">閉じる</button>' +
	'<input type="text" placeholder="todo入力" v-model="text"><br><button type="submit" @click="enterButton" class="add">追加</button>' +
  '</form></div>',
  props: ['show'],
  data() {
    return {
      text: ''
    }
  },
  methods: {
    enterButton() {
      this.$emit('add', this.text);
      this.text = '';
      this.$emit('show');
    },
    closeEntry() {
      this.$emit('show');
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
    id: Number,
    show: false,
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
    },
    showEntry() {
      console.log("a");
      if(this.show) {
        this.show = false;
      } else {
        this.show = true;
      }
    }
  }
})