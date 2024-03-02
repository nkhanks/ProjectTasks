<script setup>

import { useProjectStore } from '../store/projects';

let projectStore = useProjectStore();

function totalDone(items) {
    let total = 0

    items.forEach(element => {
        if (element.isDone) {
            total = total + 1
        }
    });
    return total
}

function styleComplete(items) {
    let total = 0

    items.forEach(element => {
        if (element.isDone) {
            total = total + 1
        }
    });
    return total == items.length ? "complete" : ""
}

</script>

<template>
    <div class="sidebar">

        <div class="heading">
            <h3>My Projects</h3>
            <span>

                <router-link to="/add-project">



                    <svg width="37" height="35" viewBox="0 0 37 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M18.5 29.4C11.544 29.4 5.92001 24.08 5.92001 17.5C5.92001 10.92 11.544 5.60001 18.5 5.60001C25.456 5.60001 31.08 10.92 31.08 17.5C31.08 24.08 25.456 29.4 18.5 29.4ZM18.5 7.00001C12.358 7.00001 7.40001 11.69 7.40001 17.5C7.40001 23.31 12.358 28 18.5 28C24.642 28 29.6 23.31 29.6 17.5C29.6 11.69 24.642 7.00001 18.5 7.00001Z"
                            fill="black" />
                        <path d="M11.84 16.8H25.16V18.2H11.84V16.8Z" fill="black" />
                        <path d="M17.76 11.2H19.24V23.8H17.76V11.2Z" fill="black" />
                    </svg></router-link>
            </span>
        </div>
        <div class="links" v-for="(link ,index) in projectStore.projects">
 
            <div>
                <div :class="index == $route.params.id ? 'link active' : 'link'">
                    <span v-if="index == $route.params.id">
                        <svg width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M25.8398 10.8047C25.6832 10.6037 25.4772 10.44 25.2388 10.3273C25.0004 10.2145 24.7365 10.1559 24.4688 10.1562H22.7812V8.59375C22.7812 8.17935 22.6035 7.78192 22.287 7.4889C21.9705 7.19587 21.5413 7.03125 21.0938 7.03125H13.7816L10.857 5C10.5644 4.79803 10.2094 4.68848 9.84445 4.6875H4.21875C3.7712 4.6875 3.34197 4.85212 3.02551 5.14515C2.70904 5.43817 2.53125 5.8356 2.53125 6.25V20.3125C2.53125 20.5197 2.62014 20.7184 2.77838 20.8649C2.93661 21.0114 3.15122 21.0938 3.375 21.0938H22.2645C22.4415 21.0938 22.6142 21.0422 22.7578 20.9463C22.9015 20.8504 23.009 20.7151 23.065 20.5596L26.0698 12.2129C26.1543 11.978 26.1775 11.728 26.1375 11.4832C26.0976 11.2384 25.9955 11.0059 25.8398 10.8047ZM9.84445 6.25L12.7691 8.28125C13.0616 8.48334 13.4166 8.59291 13.7816 8.59375H21.0938V10.1562H7.35855C7.00436 10.1562 6.65914 10.2594 6.3718 10.4511C6.08445 10.6429 5.86955 10.9135 5.75754 11.2246L4.21875 15.498V6.25H9.84445ZM21.657 19.5312H4.5457L7.35855 11.7188H24.4688L21.657 19.5312Z"
                                fill="black" />
                        </svg>
                    </span>
                    <span v-else>
                        <svg width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4.5 20.8333C3.88125 20.8333 3.35175 20.6295 2.9115 20.2219C2.47125 19.8142 2.25075 19.3236 2.25 18.75V6.25C2.25 5.67708 2.4705 5.1868 2.9115 4.77916C3.3525 4.37153 3.882 4.16736 4.5 4.16666H11.25L13.5 6.25H22.5C23.1188 6.25 23.6486 6.45416 24.0896 6.8625C24.5306 7.27083 24.7507 7.76111 24.75 8.33333V18.75C24.75 19.3229 24.5299 19.8135 24.0896 20.2219C23.6494 20.6302 23.1195 20.834 22.5 20.8333H4.5ZM4.5 18.75H22.5V8.33333H12.5719L10.3219 6.25H4.5V18.75Z"
                                fill="black" />
                        </svg>
                    </span>
                    <router-link :to="'/project/' + index">{{ link.title }}</router-link>
                </div>
                <ul v-if="index == $route.params.id">
                    <li v-for="task in link.tasks" :class="styleComplete(task.items)">{{ task.title ?? "untitled" }} (
                        {{ totalDone(task.items) }} / {{ task.items.length }} )</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.sidebar {
    position: fixed;
    width: 30%;
    background-color: white;
    height: 100vh;
    padding: 1em;
    padding-top: 2em;
    padding-left: 2em;
    padding-right: 2em;

    .links {
        .complete {
            text-decoration: line-through;
        }

        .link {
            display: flex;
            gap: 20px;

            span {
                display: flex;
                justify-content: flex-start;
                /* Align items to the right */
                align-items: center;

                /* Center items vertically */
                svg {
                    width: 30px;
                    height: 30px;
                }
            }

            a {

                display: flex;
                justify-content: flex-start;
                /* Align items to the right */
                align-items: center;
                /* Center items vertically */
                text-decoration: none;
            }

        }

        .active {
            text-decoration: underline;
        }

        ul {
            font-size: .85rem;
            list-style: none;
            padding-left: 1em;
            margin-left: 1em;
            border-left: 1px solid #D9D9D9;

            li {
                color: #2D2C2C;
                padding: .6em;
            }
        }
    }

    .heading {
        padding-top: 2.5em;
        padding-bottom: 2.5em;
        display: flex;
        color: #D9D9D9;

        h3 {
            flex: 8;
            display: flex;
            justify-content: flex-start;
            /* Align items to the right */
            align-items: center;
            /* Center items vertically */
        }

        span {
            cursor: pointer;
            flex: 2;
            display: flex;
            justify-content: flex-end;
            /* Align items to the right */
            align-items: center;
            /* Center items vertically */
            transition: 250ms ease-in-out;

            svg {
                path {
                    transition: 250ms ease-in-out;
                }
            }

            &:hover {
                transition: 250ms ease-in-out;

                svg {
                    path {
                        transition: 250ms ease-in-out;
                        fill: #D9D9D9;
                    }

                }
            }
        }

    }

    .search {
        display: flex;
        gap: 10px;
        border: 1px solid #D9D9D9;
        padding: .5em;
        padding-left: 1em;
        border-radius: 8px;

        input {
            border: none;
            width: 100%;

            &:focus {
                outline: none;
            }
        }

    }
}
</style>
