/* eslint-disable prettier/prettier */
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import {action} from "@ember/object";
import {task,timeout} from 'ember-concurrency';
import {inject as service} from '@ember/service';

export default class AcceptRequestComponent extends Component{
    @tracked paymentRequest;
    @service router;
    @tracked money;
    @service flashMessages;
    @tracked transaction;
    @tracked subs;
    @tracked newTransaction;
    @tracked count;

    constructor(){
        super(...arguments);
        let p=localStorage.getItem('paymentrequest');
        let m=localStorage.getItem('money');
        this.money=parseInt(JSON.parse(m))||0;
        let t=localStorage.getItem('transaction');
        this.transaction=JSON.parse(t)||[];
        this.paymentRequest=JSON.parse(p)||[];
        let s=localStorage.getItem('subs');
        this.subs=JSON.parse(s)||[];
        let c=localStorage.getItem('count');
        this.count=parseInt(JSON.parse(c))||1;
    }

    get paymentRequests(){
        return this.paymentRequest;
    }

    @action
    back(){
        this.router.transitionTo('index');
    }

    @task
    *firstReached(){
        yield timeout(300);
        console.log('First Reached');
    }

    @task
    *lastReached(){
        yield timeout(300);
        console.log('Last Reached');
    }

    @action
    acceptAll(){
        for(let i=0;i<this.paymentRequest.length;i++){
            if(this.paymentRequest[i].status==="Pending"){
                this.accept(this.paymentRequest[i]);
                this.count++;
            }
        }
    }

    @action
    accept(request){
        if(this.money<parseInt(request.amount)){
            this.flashMessages.add({
                message:"Insufficient Funds! Add Amount to Wallet"
            })
            return this.router.transitionTo('index');
        }

        let sub=this.subs.find((s)=>s.name===request.name);
        let amt=parseInt(sub.amount);
        let date=new Date();
        let year=date.getFullYear();
        let month=date.getMonth();
        let day=date.getDay();
        let tot=`${year}/${month}/${day}`;
        
        this.money=this.money-amt;
        this.newTransaction={
            id:this.count,
            status:false,
            name:request.name,
            amount:sub.amount,
            date:tot,
            category:request.category,
            method:"Wallet",
            curBal:this.money
        }

        this.transaction=[
            ...this.transaction,
            {...this.newTransaction}
        ];

        let cycle=parseInt(request.billing.split(" ")[0]);
        let time=request.billing.split(" ")[1];
        console.log("Cycle ",cycle)
        console.log("Time Words ",time)
        let expiry;
        if(time.includes("Minute")){
            console.log("Minutes",expiry);
            expiry=date.setMinutes(date.getMinutes()+cycle);
        }
        else{
            console.log("Second",expiry)
            expiry=date.setSeconds(date.getSeconds()+cycle);
        }

        sub.expiryDate=expiry;
        sub.date=date;
        sub.status="Success";
        this.subs=this.subs.map((s)=>s.name===sub.name?sub:s);

        let p=this.paymentRequest.find((pr)=>pr===request);
        p.status="Accepted";
        this.paymentRequest=this.paymentRequest.map((pr)=>pr===p?p:pr);
        console.log("Payment in Accept",p);
        localStorage.setItem('money',JSON.stringify(this.money));
        localStorage.setItem('paymentrequest',JSON.stringify(this.paymentRequest));
        localStorage.setItem('subs',JSON.stringify(this.subs));
        this.count++;
        localStorage.setItem('count',JSON.stringify(this.count));
        localStorage.setItem('transaction',JSON.stringify(this.transaction));
        console.log(p);

        
        this.flashMessages.add({
            message:"Success! Subscription Added"
        })
        this.router.transitionTo('index');
        console.log(sub);
    }

    @action
    reject(request){
        let sub=this.subs.find((s)=>s.name===request.name);
        // sub.status="Rejected";
        this.subs=this.subs.filter((s)=>s!==sub);
        let p=this.paymentRequest.find((pr)=>pr===request);
        console.log("Payment in reject",p);
        p.status="Rejected";
        this.paymentRequest=this.paymentRequest.map((pr)=>pr===p?p:pr);
        this.count++;
        localStorage.setItem('count',JSON.stringify(this.count));
        localStorage.setItem('paymentrequest',JSON.stringify(this.paymentRequest));
        localStorage.setItem('subs',JSON.stringify(this.subs));
        this.router.transitionTo('index');
        this.flashMessages.add({
            message:"Payment Rejected"
        })
    }

    @action
    index(){
        this.router.transitionTo('index');
    }

}
