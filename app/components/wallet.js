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
    @tracked paymentRequests=[];
    @tracked length=0;
    @tracked isMin=false;
    @tracked isSec=false;
    @tracked id;
    @tracked isShowSidebar=false;
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
        this.Timeout();
        console.log(this.router.currentRouteName);
        let amount=localStorage.getItem("money");
        let count=localStorage.getItem('count');
        let trans=localStorage.getItem('transaction');
        let pr=localStorage.getItem('paymentrequest');
        this.paymentRequests=JSON.parse(pr)||[];

        this.transaction=JSON.parse(trans)||[];
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
        let len=this.subs.filter((f)=>f.status==='Pending');
        this.length=len.length;
        console.log("This is Subs",this.subs);
    }

    @action
    transactions(){
        this.router.transitionTo('wallet-history');
    }

    @action
    Timeout(){
        this.id=setInterval(()=>{
            let now=new Date();
            console.log("Intervals");
            this.subs.forEach((s)=>{
                console.log("Checking");
                if(s.status==="Success" && now>=s.expiryDate){
                    console.log(s.payment);
                    this.upgrade(s);
                }
            })
        },1000)
    }

    @action
    upgrade(s){
        let date=new Date();
        let year=date.getFullYear();
        let month=date.getMonth();
        let day=date.getDay();
        let tot=`${year}/${month}/${day}`;

        let cycle=parseInt(s.billing.split(" ")[0]);
        let time=s.billing.split(" ")[1];
        console.log("Wallet Cycle",cycle);
        console.log("Wallet Time",time);
        let expiry;
        if(time.includes("Minute")){
            console.log("Wallet Expiry Minutes",expiry)
            expiry=date.setMinutes(date.getMinutes()+cycle);
        }
        else{
            console.log("Wallet Expiry Seconds",expiry);
            expiry=date.setSeconds(date.getSeconds()+cycle);
        }

        let newSub={
            id:s.id,
            name:s.name,
            plan:s.plan,
            billing:s.billing,
            amount:s.amount,
            category:s.category,
            payment:"Wallet",
            status:"Pending",
            expiryDate:expiry
        }
        this.subs=this.subs.map((sub)=>sub.name===s.name?newSub:sub);
        this.paymentRequests=this.paymentRequests.filter((pr)=>{
            if(pr.name===s.name){
                return pr.status!=='Pending'
            }else{
                return pr;
            }
        })
        console.log("Payment Request filtering",this.paymentRequests);
        let newPayment={
            id:this.count,
            name:s.name,
            date:tot,
            category:s.category.name,
            billing:s.billing,
            amount:s.amount,
            status:"Pending"
        }
        this.paymentRequests=[
            ...this.paymentRequests,
            {...newPayment}
        ]
        let len=this.subs.filter((f)=>f.status==='Pending');
        this.length=len.length;
        this.count++;
        localStorage.setItem("subs",JSON.stringify(this.subs));
        localStorage.setItem('count',JSON.stringify(this.count));
        localStorage.setItem('transaction',JSON.stringify(this.transaction));
        localStorage.setItem('paymentrequest',JSON.stringify(this.paymentRequests));
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
        localStorage.setItem('transaction',JSON.stringify(this.transaction));
        localStorage.setItem('paymentrequest',JSON.stringify(this.paymentRequests));
        this.router.transitionTo('subs-add')
    }

    @action
    delete(sub){
        if(sub.status==='Success'){
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
        } 
        this.paymentRequests=this.paymentRequests.filter(pr=>pr.name!==sub.name);   
        this.subs=this.subs.filter(s=>s!=sub);
        localStorage.setItem('subs',JSON.stringify(this.subs));
        localStorage.setItem('transaction',JSON.stringify(this.transaction));
        localStorage.setItem('paymentrequest',JSON.stringify(this.paymentRequests));
        this.flashMessages.add({
            message:"Canceled, the amount will be added to your wallet"
        })
    }

    @action
    edit(sub){
        this.router.transitionTo(`subs-edit`,sub.id);
    }

    @action
    send(){
        this.router.transitionTo('send');
    }

    @action
    showSidebar(){
        this.isShowSidebar=!this.isShowSidebar;
        console.log("Show Sidebar",this.isShowSidebar);
    }

    @action
    link(attr){
        this.router.transitionTo(attr);
    }
}