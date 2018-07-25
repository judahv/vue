Vue.component('button-entry',{
  template: '<div class="button-entry"><button type="button" @click="show">新規追加</button></div>',
  methods: {
    show() {
      this.$emit('show');
    }
  }
})

Vue.component('todo-entry',{
  template: '<div class="todo-entry" v-if="show">' +
  '<div class="bg-entry" @click="closeEntry"></div>' +
  '<form @submit.prevent="" class="entry">' +
  '<button type="button" @click="closeEntry" class="close">閉じる</button>' +
  '<p v-if="isError" class="text-error">Todoを入力してください。</p>' +
  '<textarea type="text" placeholder="例：部屋の掃除をする" v-model="text" :class="{ error : isError }"></textarea><br>' +
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
        this.resetEntry();
      }
    },
    closeEntry() {
      this.resetEntry();
    },
    resetEntry() {
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
    // localSotrage全データ削除用
    // localStorage.clear('list');
    // localStorage.clear('id');
    this.list = JSON.parse(localStorage.getItem('list')) || [];
    this.id = JSON.parse(localStorage.getItem('id')) || 0;
  },
  methods: {
    addList(text) {
      this.list.push({ id:this.id, text: text });
      this.id++;
      this.setList();
      this.setId();
    },
    deleteList(id) {
      this.list.some((v, i) => {
        if (v.id === id) this.list.splice(i , 1);
      });
      this.setList();
      this.setId();
    },
    showEntry() {
      this.show = !this.show;
    },
    setList() {
      localStorage.setItem('list', JSON.stringify(this.list));
    },
    setId() {
      localStorage.setItem('id', JSON.stringify(this.id));
    }
  }
})

/*
 * 【疑問】:class="{is-error:isError}" とクラス名を「is-error」にしたいが、ならない。「error」ならＯＫみたい
 * 参考文献：localStorage　https://qiita.com/shingorow/items/97c265d4cab33cb13b6c
 * 配列から特定のものを削除　https://qiita.com/_shimizu/items/b8eac14f399e20599818
 */
// Vuexが便利なわけがわかってきた。まだVuexしてないけど。簡単なものなら、コンポーネント分けずに全部ルートだけで終わらすことが可能だが、もし大規模でメンテナンス的にコンポーネント化して複雑なものになるのであれば、バケツリレーはつらい。
// 大本のルートからdataを渡すのは面倒。孫、ひ孫になると受け渡しが大変。１つずつにpropsして、dataをreturnしなくてはいけない。
// このコンポーネントでクリックしたら、親でも子でもない違うコンポーネントを操作するのは大変。

// 単一コンポーネント化（vueファイル）にする理由
// templeteは+で連結できるが、だんだん作業しずらくなる。文字列連結じゃなくなるのは見通し良いし、連結で改行位置ずれるだけでエラーでたので楽。`の改行位置おかしいとだめみたい。

// localStorageにしたときに、削除するid（splice）がずれてしまった。
// 配列の削除の仕方　spliceがうまく扱えなかっただけだった。
// localStorage https://www.pazru.net/html5/WebStorage/030.html
// lengthよりidが多かった場合やlengthのほうが小さくなってしまう場合がある。lengthより配列の最後のid++のほうが安全かも。
// idもlocalStorageに入れれば前のやつみないですむ。一般的には追加のときのＩＤをどう持っているか聞きたい。
// →保存に利用するidもlocalStorageに入れて、一元管理するように修正。

/* TodoList
 * todoの新規追加（ポップアップ）
 * todoの削除
 * ブラウザを閉じてもまた開けば保存されている（localStorage）
 * todoの一覧
 */

