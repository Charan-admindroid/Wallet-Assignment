/* eslint-disable prettier/prettier */
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import {action} from "@ember/object";
import {inject as service} from "@ember/service";
import {task,timeout} from 'ember-concurrency'

export default class TransactionsComponent extends Component{
    @tracked transaction;
    @tracked hasMore=true;
    @tracked currentPage=1;
    @tracked perPage=15;
    @tracked isLoading=false;
    @service router;

    constructor(){
        super(...arguments)
        let trans=localStorage.getItem('transaction');
        this.transaction=JSON.parse(trans)||[];
        console.log(this.transaction)
        this.initalLoad();
    }

    @action
    initalLoad(){
        this.hasMore=this.transaction.length>this.perPage;
        console.log("Has More",this.hasMore)
    }

    get transactionData(){
        console.log("Current Pages",this.currentPage);
        return this.transaction.slice(0,this.currentPage*this.perPage)
    }

    @task
    *firstReached(){
        console.log("First Reached");
        console.log("this.Hasmore",this.hasMore);
        console.log("Current Page",this.currentPage);
        if(this.currentPage<=2 && !this.isLoading){
            return;
        }
        this.isLoading=true;
        yield timeout(500);
        this.hasMore=true;
        this.currentPage=this.currentPage-1;
        console.log("First Reached")
    }

    @task
    *lastReached(){
        if(this.hasMore && !this.isLoading){
            this.isLoading=true;
            yield timeout(500);
            this.currentPage=this.currentPage+1;
            this.hasMore=this.transaction.length>this.perPage;
            console.log("Next Reached")
        }
    }

    @action
    back(){
        this.router.transitionTo("index");
    }

}