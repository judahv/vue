Vue.component('button-entry',{
  template: '<div class="button-entry"><button type="button" @click="show">新規追加</button></div>',
  methods: {
    show() {
      this.$emit('show');
    }
  }
})

Vue.component('todo-entry',{
  template: '<div class="bg-entry" v-if="show">' +
  '<form @submit.prevent="" class="entry">' +
  '<button type="button" @click="closeEntry" class="close">閉じる</button>' +
  '<p v-if="isError" class="text-error">Todoを入力してください。</p>' +
  '<input type="text" placeholder="todo入力" v-model="text" :class="{ error : isError }"><br>' +
  '<button type="submit" @click="enterButton" class="add">追加</button>' +
  '</form></div>',
  props: ['show'],
  data() {
    return {
      text: '',
      isError: false,
    }
  },
  methods: {
    enterButton(e) {
      if (this.text === '') {
        this.isError = true;
        e.preventDefault();
      } else {
        this.$emit('add', this.text);
        this.text = '';
        this.isError = false;
        this.$emit('show');
      }
    },
    closeEntry() {
      this.text = '';
      this.isError = false;
      this.$emit('show');
    }
  }
})

Vue.component('todo',{
	template: '<ul class="list">' +
  '<li v-for="item in items" :key="item.id">'+
  '<div class="list-text">{{item.text}}</div>'+
  '<div class="list-delete"><button type="button" @click="deleteButton(item.id)">削除</button></div>'+
  '</li>' +
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
    list: [],
    id: Number,
    show: false,
  },
  mounted() {
    this.list = JSON.parse(localStorage.getItem('list')) || [];

    this.id = this.list.length;
  },
  methods: {
    addList(text) {
      this.id++;
      this.list.push({ id:this.id, text: text });
      this.setList();
    },
    deleteList(id) {
      const delId = id--;
      this.list.some((v, i) => {
        if (v.id==delId) this.list.splice(i,1);
      });
      this.setList();
    },
    showEntry() {
      if(this.show) {
        this.show = false;
      } else {
        this.show = true;
      }
    },
    setList() {
      localStorage.setItem('list', JSON.stringify(this.list));
    }
  }
})

/*
 * 【疑問】:class="{is-error:isError}" とクラス名を「is-error」にしたいが、ならない。「error」ならＯＫみたい
 * 参考文献：localStorage　https://qiita.com/shingorow/items/97c265d4cab33cb13b6c
 * 配列から特定のものを削除　https://qiita.com/_shimizu/items/b8eac14f399e20599818
 */