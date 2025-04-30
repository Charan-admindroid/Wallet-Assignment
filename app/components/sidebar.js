/* eslint-disable prettier/prettier */
import Component from "@glimmer/component";
import {inject as service} from "@ember/service";
import {action} from "@ember/object";

export default class SidebarComponent extends Component{
    @service router;

    @action
    link(attr){
        this.router.transitionTo(attr);
    }
}