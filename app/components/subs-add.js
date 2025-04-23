/* eslint-disable prettier/prettier */
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import {action} from "@ember/object";
import {inject as service} from "@ember/service";

export default class SubsAddComponent extends Component{
    @tracked subs=[];
    @service router;
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
    @tracked category=["Entertainment", "Music","Gaming","News/Magazine","Videos","E-Book and Audiobook",];
    @tracked payment=["UPI", "Debit Card", "Net Banking", "Wallet"];
    
    constructor(){
        super(...arguments);
        let sub=localStorage.getItem("subs");
        if(sub){
            sub=JSON.parse(sub);
        }else{
            sub=[];
        }
        this.subs=sub;
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
