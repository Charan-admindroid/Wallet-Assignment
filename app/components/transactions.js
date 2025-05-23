/* eslint-disable prettier/prettier */
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import {action} from "@ember/object";
import {inject as service} from "@ember/service";
import { task,timeout } from 'ember-concurrency';

export default class TransactionsComponent extends Component{
    @tracked transaction;
    @tracked hasMore=true;
    @tracked currentPage=1;
    @tracked perPage=12;
    @tracked isLoading=false;
    @service router;

    get transactionData(){
        return this.transaction.slice(0,this.currentPage*this.perPage)
    }
    
    constructor(){
        super(...arguments);
        let trans=localStorage.getItem('transaction');
        this.transaction=JSON.parse(trans)||[];
        console.log(this.transaction)
        this.loadInitial();
    }
    
    @action
    loadInitial(){
        this.hasMore=this.transaction.length>this.perPage;
        this.isLoading=false;
    }
    
    @task
    *firstReached(){
        console.log("first reached Before");
        if(this.currentPage<=1 || this.isLoading){
            return;
        }
        this.isLoading=true;
        yield timeout(500);
        console.log("first reached Inside");
        this.currentPage--;
        this.isLoading=false;
        console.log("First Reached After");
    }

    
    @task
    *lastReached(){
        console.log("Last Reached Before");
        if(this.isLoading || !this.hasMore){
            return;
        }
        this.isLoading=true;
        yield timeout(500);
        this.currentPage++;
        this.hasMore=this.currentPage*this.perPage<this.transaction.length;
        this.isLoading=false;
        console.log("Last Reached After");
    }


    @action
    back(){
        this.router.transitionTo("index");
    }

    @action
    index(){
        this.router.transitionTo('index');
    }


}