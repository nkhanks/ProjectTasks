import { defineStore } from 'pinia'

export const useProjectStore = defineStore('projects', {
    state: () => {
        return {
             projects: [
                
             ] 
            }
    },
    getters: {
        doubleCount: (state) => state.count * 2,
    },
    actions: {
        addProject(data){

            this.projects.push(data)
        },
        delProject(indexToRemove){
            this.projects.splice(indexToRemove, 1);

        },
        addTask(index){
            console.log(index);
            this.projects[index].tasks.push({
                title: "",
                items: []
            })
        },
        delTask(projectIndex,indexToRemove){
            this.projects[projectIndex].tasks.splice(indexToRemove, 1);

        },
        addItem(projectIndex,index){
            this.projects[projectIndex].tasks[index].items.push({
                name: "",
                isDone: false
            })
        },
        delItem(projectIndex,index,indexToRemove){
            this.projects[projectIndex].tasks[index].items.splice(indexToRemove, 1);

        },
       
    },
})