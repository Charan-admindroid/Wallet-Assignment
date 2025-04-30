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
    @tracked paymentRequest;
    @tracked count;
    @tracked money;
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
    @tracked amount=0;
    @service flashMessages;
    @tracked editAmount=parseInt(this.editSub.amount);
    @tracked transaction;
    @tracked plans=["Standard","Pro","Pro+"];
    @tracked billing=["20 Second","40 Seconds","50 Seconds","1 Minute","2 Minutes","4 Minutes","5 Minutes","10 Minutes"];
    @tracked category=["Entertainment", "Music","Gaming","News/Magazine","Videos","E-Book and Audiobook","E-Commerce","AI","Online Course","Food App","Sports"];
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
        {name:"Food App",link:"https://img.icons8.com/?size=100&id=54389&format=png&color=000000"},
        {name:"Sports",link:"https://img.icons8.com/?size=100&id=bbiBI6nzZCwO&format=png&color=000000"}
    ];


    constructor(){
        super(...arguments);
        let a=localStorage.getItem('money');
        let sub=localStorage.getItem("subs");
        let trans=localStorage.getItem('transaction');
        this.transaction=JSON.parse(trans)||[];
        let count=localStorage.getItem('count');
        let pr=localStorage.getItem('paymentrequest');
        this.paymentRequest=JSON.parse(pr)||[];
        this.count=JSON.parse(count)||1;
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
        console.log("Payment Updated",this.editSub)
    }

    @action
    submit(e){
        e.preventDefault();
        let amt=parseInt(this.editSub.amount);
        let method=this.editSub.payment;
        console.log("Method",method);
        let cat=this.editSub.category.name;
        console.log("Catagory name",cat);
        let catLink=this.categories.find((c)=>c.name===cat);
        this.editSub={
            ...this.editSub,
            category:catLink
        }
        if(this.editSub.payment==="Wallet"){
            this.editSub={
                ...this.editSub,
                status:"Pending"
            }
        }else{ 
            this.editSub={
                ...this.editSub,
                status:"Success"
            }
        }
        console.log("Category Object",catLink);
        console.log("Edit Sub",this.editSub);
        console.log("this.Subs",this.subs);
        let date=new Date();
        let year=date.getFullYear();
        let month=date.getMonth();
        let day=date.getDay();
        let tot=`${year}/${month}/${day}`
        let cycle=parseInt(this.editSub.billing.split(" ")[0]);
        let time=this.editSub.billing.split(" ")[1];
        console.log("Edit Cycle ",cycle)
        console.log("Edit Time Words ",time)
        let expiry;
        if(time.includes("Minute")){
            console.log("Minutes",expiry);
            expiry=date.setMinutes(date.getMinutes()+cycle);
        }
        else{
            console.log("Second",expiry)
            expiry=date.setSeconds(date.getSeconds()+cycle);
        }
        this.editSub.expiryDate=expiry;
        this.subs=this.subs.map((s)=>s.name===this.editSub.name?this.editSub:s);
        console.log("This is Edit Subs",this.editSub);
        if(this.editSub.payment!=="Wallet"){
            this.newTransaction={
                id:this.count,
                status:false,
                name:this.editSub.name,
                amount:this.editSub.amount,
                date:tot,
                category:this.editSub.category.name,
                method:this.editSub.payment,
                curBal:this.amount
            }
            this.transaction=[
                ...this.transaction,
                {...this.newTransaction}
            ]
            this.flashMessages.add({
                message:`Success! Upgraded to ${this.editSub.billing} Subscription`
            })
        }
        else if(this.editSub.payment==="Wallet"){
            this.newPayment={
                id:this.count,
                name:this.editSub.name,
                date:tot,
                category:this.editSub.category.name,
                billing:this.editSub.billing,
                amount:this.editSub.amount,
                status:"Pending"
            }
            this.paymentRequest=[
                ...this.paymentRequest,
                {...this.newPayment}
            ]
            this.flashMessages.add({
                message:"Please Confirm payment in your Wallet"
            })
        }
        
        localStorage.setItem("subs",JSON.stringify(this.subs));
        localStorage.setItem('transaction',JSON.stringify(this.transaction));
        localStorage.setItem('paymentrequest',JSON.stringify(this.paymentRequest));
        this.count++;
        localStorage.setItem('count',JSON.stringify(this.count));
        this.router.transitionTo("index");
        console.log("this.subs after",this.subs);
        console.log("this.editSub After",this.editSub);
        
    }

    @action
    cancel(){
        this.router.transitionTo('index');
    }
}