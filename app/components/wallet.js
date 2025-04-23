/* eslint-disable prettier/prettier */
import Component from "@glimmer/component"
import { tracked } from "@glimmer/tracking";
import {action} from "@ember/object";
import {inject as service} from "@ember/service";

export default class WalletSub extends Component{
    @tracked money=0;
    @service router;

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
    }

    @action
    addMoney(){
        this.setToLocal();
        this.router.transitionTo('wallet-money');
    }
}