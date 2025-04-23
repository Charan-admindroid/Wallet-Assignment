/* eslint-disable prettier/prettier */
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import {action} from "@ember/object";
import {inject as service} from "@ember/service";

export default class AddMoneyWallet extends Component{
    @tracked money="";
    @tracked adding="";
    @service router;

    constructor(){
        super(...arguments);
        let amount=localStorage.getItem("money");
        if(amount){
            this.money=amount;
        }else{
            this.money=0
        }
        console.log(this.money);
    }

    @action
    updateAmount(e){
        this.adding=e.target.value;
        console.log(this.adding)
    }

    @action
    addAmount(){
        this.money=parseInt(this.money)+parseInt(this.adding);
        localStorage.setItem("money",this.money);
        this.router.transitionTo('index');
    }

    @action
    back(){
        this.router.transitionTo("index");
    }
}