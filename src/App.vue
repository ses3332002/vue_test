<template>
  <div id="app">
    <a-row type="flex" align="middle" :gutter="[16, 16]" justify="center">
      <a-col class="gutter-row">
        <a-button @click="getData">Get data</a-button>
      </a-col>
      <a-col class="gutter-row">
        <a-input
          v-model="text"
          allow-clear
          class="input"
          @pressEnter="itemAddHandler"
        />
      </a-col>
      <a-col class="gutter-row">
        <a-button @click="itemAddHandler" type="primary">Add</a-button>
      </a-col>
      <a-col class="gutter-row">
        <a-button
          @click="testHandler"
          type="primary"
          :disabled="arr.length === 0"
          >Test</a-button
        >
      </a-col>
    </a-row>
    <a-divider />
    <div class="graph">
      <div
        v-for="(graph, index) in graphsToShow()"
        :key="index"
        :style="{ height: `${graph}px` }"
        class="graph_item"
      ></div>
    </div>
    <a-divider />
    <div v-for="(item, index) in arr" :key="index" class="item">
      <to-do-item :text="item.text" @delete-item="itemDeleteHandler(item.id)" />
      <!-- {{ item.text }}
      <a-button type="link" size="small" @click="itemDeleteHandler(item.id)">
        <a-icon type="close-circle" />
      </a-button> -->
    </div>
  </div>
</template>

<script>
import { getCurrentPrice, getStreamData, unsubscribe } from './api';
import ToDoItem from './components/ToDoItem.vue';
const graphHeight = 256;
const graphFloor = 16;
export default {
  name: 'App',
  data() {
    return {
      text: '',
      arr: [],
      graphs: []
    };
  },

  mounted() {
    getStreamData(this.graphs);
  },

  beforeDestroy() {
    unsubscribe();
  },

  methods: {
    itemAddHandler() {
      if (this.text.length === 0) {
        return;
      }
      this.arr = [...this.arr, { id: new Date(), text: this.text + '' }];
      this.text = '';
    },

    itemDeleteHandler(id) {
      this.arr = this.arr.filter((item) => item.id !== id);
    },

    testHandler() {
      this.arr.push({
        id: new Date(),
        text: 'test'
      });
    },

    async getData() {
      this.text = await getCurrentPrice();
    },

    formatGraph(arr) {
      return arr.map(
        (item) =>
          ((graphHeight - graphFloor) / (this.maxPrice - this.minPrice)) *
            (item - this.minPrice) +
          graphFloor
      );
    },

    graphsToShow() {
      if (this.graphs.length === 21) {
        this.graphs.splice(0, 1);
      }
      return this.formatGraph(this.graphs);
    }
  },

  watch: {
    arr(newV, oldV) {
      console.log(oldV === newV);
      console.log('old', oldV);
      console.log('new', newV);
    }
  },
  computed: {
    maxPrice() {
      return Math.max(...this.graphs);
    },
    minPrice() {
      return Math.min(...this.graphs);
    }
  },

  components: {
    ToDoItem
  }
};
</script>

<style scoped>
#app {
  padding: 24px;
}

.input {
  width: 256px;
}

.item {
  padding: 8px;
}

.graph {
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  height: 300px;
  max-width: 824px;
  border: 2px solid green;
  border-radius: 8px;
  margin: 10px auto;
  gap: 8px;
  padding: 16px;
}

.graph_item {
  width: 32px;
  background-color: red;
}
</style>
