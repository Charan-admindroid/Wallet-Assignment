/* eslint-disable prettier/prettier */
import Component from "@glimmer/component";
import {inject as service} from "@ember/service";
import {action} from "@ember/object";
import { tracked } from '@glimmer/tracking';
import { task,timeout } from "ember-concurrency";

export default class WalletHistoryComponent extends Component{
    @tracked transaction;
    @tracked isShow=false;
    @service router;
    @tracked status;
    @tracked hasMore=true;
    @tracked currentPage=1;
    @tracked perPage=12;
    @tracked isLoading=false;

    constructor(){
        super(...arguments);
        let t=localStorage.getItem('transaction');
        this.transaction=JSON.parse(t)||[];
        this.loadInitial();
    }


    get walletHistory(){
        console.log(this.transaction.filter((t)=>t.method==='Wallet'));
        let tr=this.transaction.filter((t)=>t.method==='Wallet');
        if(this.status==='Debit'){
            console.log(this.status);
            return tr.filter((t)=>t.status===false).slice(0,this.currentPage*this.perPage);
        }else if(this.status==='Refund'){
            console.log(this.status);
            return tr.filter((t)=>t.status===true).slice(0,this.currentPage*this.perPage);;
        }else if(this.status==='Credit'){
            return tr.filter((t)=>t.category==="Wallet").slice(0,this.currentPage*this.perPage);;
        }else{
            return tr.slice(0,this.currentPage*this.perPage);;
        }
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
    toggle(){
        this.isShow=!this.isShow;
    }

    @action
    close(){
        console.log("Out Side");
        this.isShow=false;
    }

    @action
    select(attr){
        this.status=attr;
    }

    @action
    index(){
        this.router.transitionTo('index');
    }
}