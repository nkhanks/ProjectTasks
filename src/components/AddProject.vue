<script>
import { useProjectStore } from '../store/projects';
export default {
  data() {
    return {
      data: {
        title: "",
        deadline: "",
        summary: "",
        status: "0",
        tasks:[]
      }
    }
  },
  
  methods:{
    addProject(){
      let data = {...this.data}
      useProjectStore().addProject(data)
      this.$router.push({
        path:"/project/"+(useProjectStore().projects.length -1)
      })
    },
    isReady(){
      if(this.data.title.length > 3 && this.data.deadline.length > 3){
        return true;
      }
      return false;
    }
  }
}
</script>

<template>
  <div class="add-project">
    <h1>Add Project</h1>
    <p>Every great adventure starts with a single step. Start by creating your first project, adding tasks, and inviting
      your teammates to join you on this exciting journey.</p>
    <br />
    <div class="parts">
      <div class="part-1">
        <div class="group">
          <label>Project Title</label>
          <input type="text" placeholder="Project Title" v-model="data.title" />
        </div>
        <div class="group">
          <label>Project Deadline</label>
          <input type="date" v-model="data.deadline" />
        </div>
      </div>
      <div class="part-2">
        <div class="group">
          <label>Project Summary Brief</label>
          <textarea placeholder="Project Summary Brief" v-model="data.summary"></textarea>
        </div>
      </div>
      <div class="part-3">
        <button @click="addProject()" v-if="isReady()" >Submit</button>
        <p v-else >-- Enter Information --</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.add-project {
  .group {
    display: flex;
    flex-direction: column;

    label {
      opacity: 0.4;
      font-size: .75rem;
      margin-bottom: 1em;
    }

    input {
      width: 100%;
    }

    textarea {
      height: 120px;
    }
  }

  .parts {
    display: flex;
    gap: 30px;
    padding-top: 2em;
    flex-direction: column;
    width: 600px;

    .part-1 {
      display: flex;
      gap: 20px;

      .group {
        &:first-child {
          flex: 7;
        }

      }
    }
  }
}
</style>
