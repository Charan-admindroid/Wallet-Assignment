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

    setToLocal(){
        localStorage.setItem("money",this.money);
    }

    constructor(){
        super(...arguments);
        let amount=localStorage.getItem("money");
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
    }

    @action
    addMoney(){
        this.setToLocal();
        this.router.transitionTo('wallet-money');
    }

    @action
    addSubs(){
        localStorage.setItem("subs",JSON.stringify(this.subs));
        this.router.transitionTo('subs-add')
    }

    @action
    delete(sub){
        let m=parseInt(sub.amount);
        this.money=parseInt(this.money)+m;
        this.setToLocal();
        this.subs=this.subs.filter(s=>s!=sub);
        localStorage.setItem('subs',JSON.stringify(this.subs))
    }

    @action
    edit(sub){
        this.router.transitionTo(`subs-edit`,sub.id);
    }
}