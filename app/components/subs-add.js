/* eslint-disable prettier/prettier */
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import {action} from "@ember/object";
import {inject as service} from "@ember/service";

export default class SubsAddComponent extends Component{
    @tracked subs=[];
    @service router;
    @tracked money=0;
    @service flashMessages;
    @tracked newSub={
        id:this.subs.length+1,
        name:"",
        plan:"Standard",
        billing:"Weekly",
        amount:"",
        category:"Music",
        payment:"UPI"
    }
    @tracked plans=["Standard","Pro","Pro+"];
    @tracked billing=["Weekly","Monthly","Yearly"];
    @tracked category=["Entertainment","Music","Gaming","News/Magazine","Videos","E-Book and Audiobook","E-Commerce","AI"]
    @tracked categories=[
        {name:"Entertainment",link:"https://img.icons8.com/?size=100&id=2772&format=png&color=000000"},
        {name:"Music",link:"https://img.icons8.com/?size=100&id=Bri4HBrgCsPa&format=png&color=000000"},
        {name:"Gaming",link:"https://img.icons8.com/?size=100&id=sY9Y61aHdgZv&format=png&color=000000"},
        {name:"News/Magazine",link:"https://img.icons8.com/?size=100&id=eGZs8grn6szD&format=png&color=000000"},
        {name:"Videos",link:"https://img.icons8.com/?size=100&id=9a46bTk3awwI&format=png&color=000000"},
        {name:"E-Book and Audiobook",link:"https://img.icons8.com/?size=100&id=QPAhSuUaALnL&format=png&color=000000"},
        {name:"E-Commerce",link:"https://img.icons8.com/?size=100&id=3tL355qYoTqf&format=png&color=000000"},
        {name:"AI",link:"https://img.icons8.com/?size=100&id=eoxMN35Z6JKg&format=png&color=000000"}
    ];
    @tracked payment=["UPI", "Debit Card", "Net Banking", "Wallet"];
    
    constructor(){
        super(...arguments);
        let sub=localStorage.getItem("subs");
        let m=localStorage.getItem('money');
        if(sub){
            sub=JSON.parse(sub);
        }else{
            sub=[];
        }
        if(m){
            m=JSON.parse(m);
        }else{
            m=0;
        }
        this.subs=sub;
        this.money=parseInt(m);
    }

    @action
    updatePlan(selected){
        this.newSub={
            ...this.newSub,
            plan:selected
        }
    }

    @action
    updateBilling(selected){
        this.newSub={
            ...this.newSub,
            billing:selected
        }
    }

    @action
    updateSubs(attr,event){
        this.newSub={
            ...this.newSub,
            [attr]:event.target.value
        }
    }

    @action
    updateCategory(selected){
        this.newSub={
            ...this.newSub,
            category:selected
        }
    }

    @action
    updatePayment(selected){
        this.newSub={
            ...this.newSub,
            payment:selected
        }
    }

    @action
    submit(e){
        e.preventDefault();
        let o=this.newSub.category;
        let cat=this.categories.find((c)=>c.name===o);
        let m=parseInt(this.newSub.amount);
        let method=this.newSub.payment;
        if(method==="Wallet"&&this.money>=m){
            this.money=this.money-m;
            localStorage.setItem('money',JSON.stringify(this.money));
        }else{
            console.log("Add Money into your wallet");
            this.flashMessages.add({
                message:'Add Money into your wallet',
                type: 'alert',
                timeout: 1000,
                priority: 200,
                sticky: true,
                showProgress: true,
            })
            return this.router.transitionTo("index");
        }
        this.newSub={
            ...this.newSub,
            category:cat
        }
        this.subs=[
            ...this.subs,
            {...this.newSub}
        ]
        this.newSub={
            id:this.subs.length+1,
            name:"",
            plan:"Standard",
            billing:"Weekly",
            amount:"",
            category:"Music",
            payment:"UPI"
        }
        localStorage.setItem("subs",JSON.stringify(this.subs));
        this.router.transitionTo("index");
        console.log(this.subs);
        console.log(this.newSub);
    }

    @action
    cancel(){
        this.router.transitionTo('index');
    }
}
