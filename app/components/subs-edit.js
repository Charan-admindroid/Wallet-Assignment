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
    @tracked category=["Entertainment", "Music","Gaming","News/Magazine","Videos","E-Book and Audiobook","E-Commerce","AI"];
    @tracked payment=["UPI", "Debit Card", "Net Banking", "Wallet"];
    
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