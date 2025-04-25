/* eslint-disable prettier/prettier */
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import {action} from '@ember/object';
import {inject as service} from "@ember/service";

export default class SubsEdit extends Component{
    @tracked subs=[];
    @service router;
    @tracked editSub={
        ...this.args.sub
    }
    @tracked amount=0;
    @service flashMessages;
    @tracked editAmount=parseInt(this.editSub.amount);
    @tracked plans=["Standard","Pro","Pro+"];
    @tracked billing=["Weekly","Monthly","Yearly"];
    @tracked category=["Entertainment", "Music","Gaming","News/Magazine","Videos","E-Book and Audiobook","E-Commerce","AI","Online Course","Food App"];
    @tracked payment=["UPI", "Debit Card", "Net Banking", "Wallet"];
    
    @tracked categories=[
        {name:"Entertainment",link:"https://img.icons8.com/?size=100&id=2772&format=png&color=000000"},
        {name:"Music",link:"https://img.icons8.com/?size=100&id=Bri4HBrgCsPa&format=png&color=000000"},
        {name:"Gaming",link:"https://img.icons8.com/?size=100&id=sY9Y61aHdgZv&format=png&color=000000"},
        {name:"News/Magazine",link:"https://img.icons8.com/?size=100&id=eGZs8grn6szD&format=png&color=000000"},
        {name:"Videos",link:"https://img.icons8.com/?size=100&id=9a46bTk3awwI&format=png&color=000000"},
        {name:"E-Book and Audiobook",link:"https://img.icons8.com/?size=100&id=QPAhSuUaALnL&format=png&color=000000"},
        {name:"E-Commerce",link:"https://img.icons8.com/?size=100&id=3tL355qYoTqf&format=png&color=000000"},
        {name:"AI",link:"https://img.icons8.com/?size=100&id=eoxMN35Z6JKg&format=png&color=000000"},
        {name:"Online Course",link:"https://img.icons8.com/?size=100&id=8S2yTT52Xkf7&format=png&color=000000"},
        {name:"Food App",link:"https://img.icons8.com/?size=100&id=54389&format=png&color=000000"}
    ];


    constructor(){
        super(...arguments);
        let a=localStorage.getItem('money');
        let sub=localStorage.getItem("subs");
        if(a){
            a=JSON.parse(a);
        }else{
            a=0
        }
        if(sub){
            sub=JSON.parse(sub);
        }else{
            sub=[];
        }
        this.subs=sub;
        this.amount=parseInt(a);
        console.log("Amount",this.amount);
        console.log("Edit Amount",this.editAmount)
    }

    @action
    updatePlan(selected){
        this.editSub={
            ...this.editSub,
            plan:selected
        }
    }

    @action
    updateBilling(selected){
        this.editSub={
            ...this.editSub,
            billing:selected
        }
    }

    @action
    updateSubs(attr,event){
        this.editSub={
            ...this.editSub,
            [attr]:event.target.value
        }
    }

    @action
    updateCategory(selected){
        this.editSub={
            ...this.editSub,
            category:{
                ...this.editSub.category,
                name:selected
            }
        }
        console.log("Function",this.editSub);
    }

    @action
    updatePayment(selected){
        this.editSub={
            ...this.editSub,
            payment:selected
        }
    }

    @action
    submit(e){
        e.preventDefault();
        let amt=parseInt(this.editSub.amount);
        let method=this.editSub.payment;

        if(method==="Wallet"&&this.editAmount>amt){
            let diff=this.editAmount-amt;
            this.amount=this.amount+diff;
        }
        else if(method==="Wallet"&&this.editAmount<amt && this.amount>=amt){
            let diff=amt-this.editAmount;
            this.amount=this.amount-diff;
        }
        else if(method==="Wallet"&&this.amount<amt){
            console.log("Insuffient Funds")
            this.flashMessages.add({
                message:"InSufficient Funds! Add Amount to your Wallet"
            })
            return this.router.transitionTo('index');
        }
        let cat=this.editSub.category.name;
        console.log("Catgory name",cat);
        let catLink=this.categories.find((c)=>c.name===cat);
        this.editSub={
            ...this.editSub,
            category:catLink
        }
        console.log("Category Object",catLink);
        console.log("Edit Sub",this.editSub);
        console.log("this.Subs",this.subs);
        this.subs=this.subs.map((s)=>s.id===this.editSub.id?this.editSub:s)
        localStorage.setItem("subs",JSON.stringify(this.subs));
        localStorage.setItem('money',JSON.stringify(this.amount));
        this.router.transitionTo("index");
        console.log("this.subs after",this.subs);
        console.log("this.editSub After",this.editSub);
        
    }

    @action
    cancel(){
        this.router.transitionTo('index');
    }
}