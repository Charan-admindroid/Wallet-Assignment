/* eslint-disable prettier/prettier */
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import {action} from "@ember/object";
import {inject as service} from "@ember/service";

export default class AddMoneyWallet extends Component{
    @tracked money="";
    @tracked adding="";
    @service router;
    @service flashMessages;
    @tracked transactions;
    @tracked count;

    constructor(){
        super(...arguments);
        let amount=localStorage.getItem("money");
        let t=localStorage.getItem('transaction');
        let c=localStorage.getItem('count');
        this.count=parseInt(JSON.parse(c))||1;
        this.transactions=JSON.parse(t)||[];
        if(amount){
            this.money=amount;
        }else{
            this.money=0
        }
        console.log(this.money);
    }

    @action
    updateAmount(e){
        this.adding=e.target.value;
        console.log(this.adding)
    }

    @action
    addAmount(e){
        e.preventDefault();
        this.money=parseInt(this.money)+parseInt(this.adding);

        let date=new Date();
        let year=date.getFullYear();
        let month=date.getMonth();
        let day=date.getDay();
        let tot=`${year}/${month}/${day}`;

        let newTransaction={
            id:this.count,
            status:true,
            name:"Adding Wallet",
            amount:this.adding,
            date:tot,
            category:"Wallet",
            method:"Wallet",
            curBal:this.money

        }

        this.transactions=[
            ...this.transactions,
            {...newTransaction}
        ];

        localStorage.setItem("money",this.money);
        localStorage.setItem('transaction',JSON.stringify(this.transactions));
        this.count++;
        localStorage.setItem('count',JSON.stringify(this.count));
        this.flashMessages.add({
            message:"Success! Amount Added to your Wallet"
        })
        console.log("Flash",this.flashMessages);
        this.router.transitionTo('index');
    }

    @action
    back(){
        this.router.transitionTo("index");
    }
}