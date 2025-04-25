/* eslint-disable prettier/prettier */
import Component from "@glimmer/component"
import { tracked } from "@glimmer/tracking";
import {action} from "@ember/object";
import {inject as service} from "@ember/service";

export default class WalletSub extends Component{
    @tracked money=0;
    @service router;
    @tracked subs=[];
    @tracked isSub=false;
    @service flashMessages;
    @tracked count=1;
    @tracked transaction=[];
    @tracked newTransaction={
        id:this.count,
        status:true,
        name:"",
        amount:"",
        date:"",
        category:"",
        method:"",
        curBal:""
    }

    setToLocal(){
        localStorage.setItem("money",this.money);
    }

    constructor(){
        super(...arguments);
        let amount=localStorage.getItem("money");
        let count=localStorage.getItem('count');
        let trans=localStorage.getItem('transaction');
        this.transaction=JSON.parse(trans);
        if(amount){
            this.money=amount;
        }else{
            this.money=0
        }
        let sub=localStorage.getItem("subs");
        if(sub){
            this.subs=JSON.parse(sub);
            this.isSub=true;
        }else{
            this.subs=[];
        }
        if(count){
            count=JSON.parse(count);
        }else{
            count=1;
        }
        this.count=count;
    }

    @action
    transactions(){
        this.router.transitionTo('transactions');
    }

    @action
    addMoney(){
        this.setToLocal();
        this.router.transitionTo('wallet-money');
    }

    @action
    addSubs(){
        localStorage.setItem("subs",JSON.stringify(this.subs));
        localStorage.setItem('count',JSON.stringify(this.count));
        localStorage.setItem('transaction',JSON.stringify(this.transaction))
        this.router.transitionTo('subs-add')
    }

    @action
    delete(sub){
        let m=parseInt(sub.amount);
        this.money=parseInt(this.money)+m;
        this.setToLocal();


        let date=new Date();
        let year=date.getFullYear();
        let month=date.getMonth();
        let day=date.getDay();
        let tot=`${year}/${month}/${day}`
        this.newTransaction={
            id:this.count,
            status:true,
            name:sub.name,
            amount:sub.amount,
            date:tot,
            category:sub.category.name,
            method:sub.payment,
            curBal:this.money
        }

        this.transaction=[
            ...this.transaction,
            {...this.newTransaction}
        ]
        this.subs=this.subs.filter(s=>s!=sub);
        localStorage.setItem('subs',JSON.stringify(this.subs));
        localStorage.setItem('transaction',JSON.stringify(this.transaction));
    }

    @action
    edit(sub){
        this.router.transitionTo(`subs-edit`,sub.id);
    }
}