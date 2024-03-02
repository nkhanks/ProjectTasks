<script>
import { useProjectStore } from '../store/projects';

export default {
  data() {
    return {
      id: "",
      data: {}
    }
  },
  watch: {
    '$route.params.id': function (newId, oldId) {
      // React to changes in the id parameter
      this.id = parseInt(this.$route.params.id);
      if (useProjectStore().projects.length >= this.$route.params.id) {
        this.data = useProjectStore().projects[this.$route.params.id]
      }
    }
  },
  mounted() {
    this.id = parseInt(this.$route.params.id);
    if (useProjectStore().projects.length >= this.$route.params.id) {
      this.data = useProjectStore().projects[this.$route.params.id]
    }

  },
  methods: {
    addTask() {
      useProjectStore().addTask(this.$route.params.id)
    },
    addItem(taskIndex) {
      useProjectStore().addItem(this.id, taskIndex)
    },
    delItem(taskIndex, index) {
      useProjectStore().delItem(this.id, taskIndex, index)
    },
    delTask( index) {
      useProjectStore().delTask(this.id, index)
    },
    delProject() {
      useProjectStore().delProject(this.id)
      this.$router.push({
        path:"/"
      })
    },
    getStatus(status) {
      console.log(status)
      switch (status) {
        case "0":
          return "In Progress"
        case "1":
          return "Complete"
        case "2":
          return "Cancelled"
        default:
          return "please"
      }
    },
    getStatusStlye(status) {

      switch (status) {
        case "0":
          return "color : #9DA007"
        case "1":
          return "color : green"
        case "2":
          return "color : red"
        default:
          return "color : gray"
      }
    },
    isReady() {
      if (this.data.title.length > 3 && this.data.deadline.length > 3) {
        return true;
      }
      return false;
    }
  }
}
</script>

<template>
  <div class="project">
    <div class="header">
      <div class="half">
        <h1>
          <router-link  :to="'/edit-project/' + id" >
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M15.1973 3.83632C15.2646 3.93847 15.2946 4.06071 15.2822 4.18241C15.2698 4.3041 15.2158 4.41779 15.1293 4.50428L8.61757 11.0153C8.55095 11.0819 8.46784 11.1295 8.37674 11.1534L5.66453 11.8617C5.57487 11.8851 5.48066 11.8847 5.39125 11.8604C5.30183 11.8361 5.22032 11.7889 5.15481 11.7233C5.08929 11.6578 5.04205 11.5763 5.01777 11.4869C4.99349 11.3975 4.99302 11.3033 5.0164 11.2136L5.72474 8.50212C5.74541 8.42072 5.78442 8.34513 5.83878 8.28112L12.3746 1.74957C12.4742 1.65009 12.6092 1.59421 12.75 1.59421C12.8908 1.59421 13.0258 1.65009 13.1254 1.74957L15.1293 3.75274C15.1547 3.77824 15.1775 3.80625 15.1973 3.83632ZM14.0023 4.12816L12.75 2.87653L6.7164 8.91012L6.27369 10.6052L7.96874 10.1624L14.0023 4.12816Z"
                fill="black" />
              <path
                d="M13.9124 12.155C14.106 10.5003 14.1678 8.83283 14.0972 7.16833C14.0957 7.12912 14.1023 7.09001 14.1165 7.05345C14.1308 7.01688 14.1524 6.98365 14.1801 6.95583L14.8771 6.25883C14.8962 6.23968 14.9203 6.22643 14.9467 6.22069C14.9731 6.21494 15.0006 6.21694 15.0259 6.22644C15.0512 6.23594 15.0732 6.25254 15.0893 6.27424C15.1054 6.29595 15.1148 6.32184 15.1165 6.34879C15.2477 8.32592 15.1979 10.3109 14.9678 12.279C14.8006 13.7112 13.6503 14.8339 12.2244 14.9933C9.74904 15.2674 7.25096 15.2674 4.77558 14.9933C3.35042 14.8339 2.19937 13.7112 2.03221 12.279C1.73853 9.76821 1.73853 7.23179 2.03221 4.72104C2.19937 3.28879 3.34971 2.16608 4.77558 2.00671C6.65434 1.79838 8.54726 1.74791 10.4345 1.85583C10.4615 1.85777 10.4874 1.86741 10.5091 1.88361C10.5308 1.89981 10.5474 1.92188 10.5569 1.94722C10.5664 1.97257 10.5685 2.00011 10.5629 2.0266C10.5573 2.05308 10.5441 2.0774 10.5251 2.09667L9.82175 2.79933C9.7942 2.82678 9.76132 2.84829 9.72514 2.86255C9.68896 2.8768 9.65024 2.88349 9.61137 2.88221C8.03658 2.82868 6.45997 2.88904 4.89387 3.06283C4.43625 3.11349 4.00906 3.31693 3.68132 3.6403C3.35357 3.96368 3.14441 4.3881 3.08762 4.845C2.80362 7.27339 2.80362 9.72661 3.08762 12.155C3.14441 12.6119 3.35357 13.0363 3.68132 13.3597C4.00906 13.6831 4.43625 13.8865 4.89387 13.9372C7.27033 14.2028 9.72966 14.2028 12.1068 13.9372C12.5645 13.8865 12.9916 13.6831 13.3194 13.3597C13.6471 13.0363 13.8556 12.6119 13.9124 12.155Z"
                fill="black" />
            </svg>
          </router-link>
          {{ data.title }} <small :style="'font-size: .75rem;' + getStatusStlye(data.status)">{{ getStatus(data.status)
            }}</small>
        </h1>
      </div>
      <div class="half">
        <div class="right">
          <select v-model="data.status">
            <option value="0">In Progress</option>
            <option value="1">Complete</option>
            <option value="2">Cancelled</option>
          </select>
          <button @click="addTask" v-if="data.status== 0">+ Add Task</button>
          <a @click="delProject()" >Delete Project</a>
        </div>
      </div>
    </div>
    <br />
    <p>{{ data.summary }}</p>
    <br />
    <div class="tasks">
      <div class="task" v-for="(task, i) in data.tasks">
        <div class="action">
          <svg @click="delTask(i)"  v-if="data.status== 0" width="15" height="17" viewBox="0 0 15 17" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3.75 13.4583C3.75 14.2375 4.3125 14.875 5 14.875H10C10.6875 14.875 11.25 14.2375 11.25 13.4583V4.95833H3.75V13.4583ZM11.875 2.83333H9.6875L9.0625 2.125H5.9375L5.3125 2.83333H3.125V4.25H11.875V2.83333Z"
                  fill="#E93A3A" fill-opacity="0.41" />
              </svg>
        </div>
        
        <input type="" placeholder="Enter Task Title" v-model="task.title" class="title" />
        
        <div class="items">
          <div class="item" v-for="(item, x) in task.items">
            <div class="one">
              <input type="checkbox" v-model="item.isDone" />
            </div>
            <input type="" placeholder="Enter Item" v-model="item.name" class="two" />
            <span class="three">
              <svg @click="delItem(i, x)"  v-if="data.status== 0" width="15" height="17" viewBox="0 0 15 17" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3.75 13.4583C3.75 14.2375 4.3125 14.875 5 14.875H10C10.6875 14.875 11.25 14.2375 11.25 13.4583V4.95833H3.75V13.4583ZM11.875 2.83333H9.6875L9.0625 2.125H5.9375L5.3125 2.83333H3.125V4.25H11.875V2.83333Z"
                  fill="#E93A3A" fill-opacity="0.41" />
              </svg>
            </span>
          </div>
          <div class="add-task" @click="addItem(i)" v-if="data.status== 0">
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10.5" cy="10.5" r="10.5" fill="#D9D9D9" />
              <path
                d="M13 11.0406H10.5V13.7489C10.5 13.8926 10.4473 14.0304 10.3536 14.1319C10.2598 14.2335 10.1326 14.2906 10 14.2906C9.86739 14.2906 9.74021 14.2335 9.64645 14.1319C9.55268 14.0304 9.5 13.8926 9.5 13.7489V11.0406H7C6.86739 11.0406 6.74021 10.9835 6.64645 10.8819C6.55268 10.7804 6.5 10.6426 6.5 10.4989C6.5 10.3553 6.55268 10.2175 6.64645 10.1159C6.74021 10.0143 6.86739 9.95725 7 9.95725H9.5V7.24892C9.5 7.10526 9.55268 6.96749 9.64645 6.8659C9.74021 6.76432 9.86739 6.70725 10 6.70725C10.1326 6.70725 10.2598 6.76432 10.3536 6.8659C10.4473 6.96749 10.5 7.10526 10.5 7.24892V9.95725H13C13.1326 9.95725 13.2598 10.0143 13.3536 10.1159C13.4473 10.2175 13.5 10.3553 13.5 10.4989C13.5 10.6426 13.4473 10.7804 13.3536 10.8819C13.2598 10.9835 13.1326 11.0406 13 11.0406Z"
                fill="white" />
            </svg>
            <p>Add New Item</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style lang="scss">
.project {
  .header {
    display: flex;
    padding-bottom: 3em;

    .half {
      h1 {
        padding: 0px;
        margin: 0px;
      }

      gap: 20px;
      flex: 1;

      .right {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 30px;

        select {
          width: 140px;
          background: transparent;
        }

        a {
          font-size: .75em;
          color: #E93A3A;
        }
      }
    }
  }

  .tasks {
    display: grid;
    grid-template-columns: 50% 50%;
    gap: 20px;

    .task {
position: relative;
.action{
  position: absolute;
  background-color: #fff;
  padding: .3em;
  top:-10px;
  border: 1px solid #000;
  border-radius: 40px;
  right: -10px;

}
      padding: 1em;
      background: #FFFFFF;
      border: 1px solid #D9D9D9;

      h4 {
        margin: 0px;
        padding-bottom: 1em;
        border-bottom: 1px solid #D9D9D9;
      }

      .title {
        border: none;
        font-size: 1rem;
        font-weight: 700;
        padding-left: 0px;
        border-bottom: 1px solid #D9D9D9;
        border-radius: 0px;
        margin-bottom: 1rem;

        &:focus {
          outline: none;
        }
      }

      .add-task {
        display: flex;
        gap: 20px;
        padding: 1em;
        border: 1px dashed #D9D9D9;
        margin-top: 1em;
        color: #D9D9D9;
        cursor: pointer;
      }

      .item {
        display: flex;
        flex: 1;
        gap: 10px;
        padding-top: 1.5em;
        padding-bottom: 1.5em;


        &:last-child {
          border-bottom: none;
        }

        .one {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          width: 15px;
          height: 15px;

          flex: 1;
        }

        .two {
          flex: 8;
          border: none;
          padding: 0px;
          border-radius: 0px;
          font-size: 1em;

          &:focus {
            outline: none;
          }
        }

        .three {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          flex: 1;
        }
      }
    }
  }


}
</style>
