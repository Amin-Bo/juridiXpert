<template>
    <div>
        <Navbar />
        <div class="board">
            <div class="lane">
                <h4 class="lane-title">To Do</h4>
                <Container group-name="trello" 
                @dragstart="handleDragStart('todo', $event)"
                 @drop="handleDrop('todo', $event)" 
                 :get-child-payload="getChildPayload"
                 :drop-placeholder="{className:'placeholder'}">
                    <Draggable v-for="card in cards.todo" :key="card.id">
                <Card>{{card.text}}</Card>
                    </Draggable>
                    </Container> 
            </div>
            <div class="lane">
                <h4 class="lane-title">Doing</h4>
                <Container group-name="trello" 
                @dragstart="handleDragStart('doing', $event)" 
                @drop="handleDrop('doing', $event)" 
                :get-child-payload="getChildPayload"
                :drop-placeholder="{className:'placeholder'}">
                    <Draggable v-for="card in cards.doing" :key="card.id">
                <Card>{{card.text}}</Card>
                    </Draggable>
                    </Container> 
            </div>
            <div class="lane">
                <h4 class="lane-title">Review</h4>
                <Container group-name="trello" 
                @dragstart="handleDragStart('review', $event)" 
                @drop="handleDrop('review', $event)" 
                :get-child-payload="getChildPayload"
                :drop-placeholder="{className:'placeholder'}">
                    <Draggable v-for="card in cards.review" :key="card.id">
                <Card>{{card.text}}</Card>
                    </Draggable>
                    </Container> 
            </div>
            <div class="lane">
                <h4 class="lane-title">Done</h4>
                <Container group-name="trello" 
                @dragstart="handleDragStart('done', $event)" 
                @drop="handleDrop('done', $event)"
                :get-child-payload="getChildPayload"
                :drop-placeholder="{className:'placeholder'}">
                    <Draggable v-for="card in cards.done" :key="card.id">
                <Card>{{card.text}}</Card>
                    </Draggable>
                    </Container> 
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import initialCard from "../initialCards"
import { Container, Draggable } from "vue-smooth-dnd";
export default {
    name:'Question',
    components:{
        Navbar,
        Card,
        Container,
        Draggable
    },
    data:()=>({
        cards:{
            todo: initialCard.todo,
            doing: initialCard.doing,
            review: initialCard.review,
            done: [],
        },
        draggingCard:{
            lane: '',
            index: -1,
            cardData: {},

        },
    }),
    methods: {
        handleDragStart(lane, dragResult){
           const {payload, isSource} = dragResult;
           if(isSource){
               this.draggingCard = {
                   lane,
                   index: payload.index,
                   cardData: {
                       ...this.cards[lane][payload.index],
                   }
               };
           }
        },
        handleDrop(lane, dropResult){
           const{ removedIndex, addedIndex} = dropResult;
            if (lane === this.draggingCard.lane && removedIndex === addedIndex) {
                return;
            }

            if (removedIndex !== null){
                this.cards[lane].splice(removedIndex, 1);
            }

            if (addedIndex !== null){
                this.cards[lane].splice(addedIndex, 0, this.draggingCard.cardData);
            }
        },
            getChildPayload(index){
                return {
                    index,
                };
        },
    },
};
</script>
<style>
.board{
    display: flex;
    justify-content: flex-start;
    margin: 1.2rem 0.8rem;
}
.lane{
    background-color: #ffecb3;
    width: 23rem;
    height: 30rem;
    border-radius: 0.8rem ;
    box-shadow: 0 .1rem .2rem 0 regba(33, 33, 33, 0.1);
    margin: 0 0.8rem;
    padding: 0 0.7rem;
}

.lane-title{
    padding: 0.8rem 0.5rem;
    margin-bottom: 0.6rem;
    color: #616161;
}
.placeholder{
    background: rgba(33, 33, 33, 0.08);
    border-radius: 0.4rem;
    transform: scaleY(0.85);
    transform-origin: 0% 0%;
}
</style>