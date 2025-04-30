import EmberRouter from '@ember/routing/router';
import config from 'wallet/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('wallet-money');
  this.route('subs-add');
  this.route('subs-edit', { path: '/subs/:id/edit' });
  this.route('subscriptions', function () {});
  this.route('transactions');
  this.route('send');
  this.route('wallet-history');
});
