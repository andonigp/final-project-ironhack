<template>
    <Nav />
    <div class="sendTaskFlex">
        <div class="sendTaskContainer">
            <div class="sendTaskHeader">
                <h1>Send a Task</h1>
            </div>
            <label for="to">To:</label>
            <input type="text"> <br>
            <label for="due">Due date:</label>
            <input type="date">
        </div>
    </div> 
    <div class="sentTasksTableFlex">
        <div class="sentTaskTableHeader">
            <i class="fas fa-trash-alt"></i>
            <label for="to">To</label>
            <label for="due">Due</label>
            <label for="title">Title</label>
            <label for="is_complete">Completed</label>
            <label for="description">Description</label>
        </div>
        <div class="sentTaskTableElement">
            <i class="fas fa-trash-alt"></i>
            <label for="to">agoico@gmail.com</label>
            <label for="due">10/02/2023</label>
            <label for="title">Corregir el footer</label>
            <label for="is_complete">False</label>
            <label for="description">This is a description.</label>
        </div>
        <hr>
        <div class="sentTaskTableElement">
            <i class="fas fa-trash-alt"></i>
            <label for="to">agoico@gmail.com</label>
            <label for="due">10/02/2023</label>
            <label for="title">Corregir el footer</label>
            <label for="is_complete">False</label>
            <label for="description">This is a description.</label>
        </div>
        <hr>
    </div>
    <Footer />   
</template>

<script setup>
import Footer from '../components/Footer.vue';
import Nav from '../components/Nav.vue';


</script>

<style>
.sentTasksTableFlex {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 80px;
}

.sentTaskTableHeader {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 1000px;
    height: 20px;
    background: #5e6881;
    margin: auto;
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: .25rem;
    margin-bottom: 0px;
    color: white;
}

.sentTaskTableElement {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 1000px;
    height: 20px;
    margin: auto;
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: .25rem;
    margin-bottom: 0px;
}

.sentTasksTableFlex hr {
    width: 1000px;
}

</style>