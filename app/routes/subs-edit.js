/* eslint-disable prettier/prettier */
import Route from '@ember/routing/route';
import { tracked } from '@glimmer/tracking';
export default class SubsEditRoute extends Route {
    @tracked data;
    
    constructor(){
        super(...arguments);
        let d=localStorage.getItem('subs');
        this.data=JSON.parse(d);
        console.log(this.data);
    }
    model(params){
        console.log(params);
        return this.data.find((d)=>d.id===parseInt(params.id));
    }
}
