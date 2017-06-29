import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TeamsPage, MyTeamsPage } from "../pages";

import { EliteApi } from '../../shared/shared';

/**
 * Generated class for the TournamentsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {

  tournaments: any;

  constructor(private nav: NavController,
              private navParams: NavParams,
              private eliteApi: EliteApi,
              private loadingController: LoadingController) {
  }

  itemTapped($event, tournay) {
    this.nav.push(TeamsPage, tournay);
  }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content: 'Getting tournaments'
    });
    loader.present().then(() => {
      this.eliteApi.getTournaments().then(data => {
        this.tournaments = data;
        loader.dismiss();
      });
    });
  }

}
