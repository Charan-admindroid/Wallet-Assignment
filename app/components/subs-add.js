/* eslint-disable prettier/prettier */
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import {action} from "@ember/object";
import {inject as service} from "@ember/service";

export default class SubsAddComponent extends Component{
    @tracked subs=[];
    @tracked paymentRequests;
    @service router;
    @tracked money=0;
    @service flashMessages;
    @tracked transaction;
    @tracked id=0;
    @tracked newSub={
        id:this.count,
        name:"",
        plan:"Standard",
        billing:"2 Minutes",
        amount:"",
        category:"Music",
        payment:"UPI",
        status:"Pending",
        expiryDate:""
    }

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

    @tracked count=1;
    @tracked plans=["Standard","Pro","Pro+"];
    @tracked billing=["20 Second","40 Seconds","50 Seconds","1 Minute","2 Minutes","4 Minutes","5 Minutes","10 Minutes"];
    @tracked category=["Entertainment","Music","Gaming","News/Magazine","Videos","E-Book and Audiobook","E-Commerce","AI","Online Course","Food App","Sports"]
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
    @tracked payment=["UPI", "Debit Card", "Net Banking", "Wallet"];
    
    constructor(){
        super(...arguments);
        let sub=localStorage.getItem("subs");
        let m=localStorage.getItem('money');
        let count=localStorage.getItem('count');
        let trans=localStorage.getItem('transaction');
        this.transaction=JSON.parse(trans)||[];
        let payment=localStorage.getItem('paymentrequest');
        this.paymentRequests=JSON.parse(payment)||[];
        console.log(this.transaction);
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
        if(count){
            count=JSON.parse(count);
        }else{
            count=1;
        }
        this.subs=sub;
        this.money=parseInt(m);
        this.count=parseInt(count);
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

        let date=new Date();
        let year=date.getFullYear();
        let month=date.getMonth();
        let day=date.getDay();
        let tot=`${year}/${month}/${day}`;
        let cycle=parseInt(this.newSub.billing.split(" ")[0]);
        let time=this.newSub.billing.split(" ")[1];
        let expiry;
        if(time.includes("Minute")){
            expiry=date.setMinutes(date.getMinutes()+cycle);
        }
        else{
            console.log("Second")
            expiry=date.setSeconds(date.getSeconds()+cycle);
        }

        this.newSub={
            ...this.newSub,
            expiryDate:expiry
        }

        this.newSub={
            ...this.newSub,
            category:cat
        }
        if(this.newSub.payment!=="Wallet"){
            this.newSub={
                ...this.newSub,
                status:"Success"
            }
        }

        let name=this.subs.find((s)=>s.name===this.newSub.name);
        if(name && name.status==='Rejected'){
            this.subs=this.subs.filter((s)=>s.name!==name.name);
            this.subs=[
                ...this.subs,
                {...this.newSub}
            ]
            // this.flashMessages.add({
            //     message:""
            // })
            // return this.router.transitionTo('index');
        }
        else if(name){
            this.flashMessages.add({
                message:"Don't Hurry! Subscription is Already there you can Upgrade it"
            })
            return this.router.transitionTo('index');
        }
        else{
            this.subs=[
                ...this.subs,
                {...this.newSub}
            ]
        }


        if(this.newSub.payment!=="Wallet"){
            this.newTransaction={
                id:this.count,
                status:false,
                name:this.newSub.name,
                amount:this.newSub.amount,
                date:tot,
                category:this.newSub.category.name,
                method:this.newSub.payment,
                curBal:this.money
            }
    
            this.transaction=[
                ...this.transaction, 
                {...this.newTransaction}
            ]
            this.flashMessages.add({
                message:"Success! Successfully Subscription is Added"
            })
        }
        

        if(this.newSub.payment==="Wallet"){
            this.newPayment={
                id:this.count,
                name:this.newSub.name,
                date:tot,
                category:this.newSub.category.name,
                billing:this.newSub.billing,
                amount:this.newSub.amount,
                status:"Pending"
            }
            this.paymentRequests=[
                ...this.paymentRequests,
                {...this.newPayment}
            ]
            this.flashMessages.add({
                message:"Please Confirm payment in your Wallet"
            })
        }

        
        localStorage.setItem("subs",JSON.stringify(this.subs));
        localStorage.setItem('transaction',JSON.stringify(this.transaction));
        localStorage.setItem('paymentrequest',JSON.stringify(this.paymentRequests));
        this.count++;
        localStorage.setItem('count',JSON.stringify(this.count));
        console.log(this.subs);
        console.log(this.newSub);
        this.router.transitionTo("index");
    }

    @action
    cancel(){
        this.router.transitionTo('index');
    }
}
