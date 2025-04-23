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
            category:selected
        }
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
        this.subs=this.subs.map((s)=>s.id===this.editSub.id?this.editSub:s)
        localStorage.setItem("subs",JSON.stringify(this.subs));
        this.router.transitionTo("index");
        console.log(this.subs);
        console.log(this.editSub);
    }

    @action
    cancel(){
        this.router.transitionTo('index');
    }
}