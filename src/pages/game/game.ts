import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EliteApi } from '../../shared/shared';
import {TeamHomePage} from "../team-home/team-home";

@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  game: any;

  constructor(public nav: NavController,
              public navParams: NavParams,
              private eliteApi: EliteApi) {
  }

  ionViewLoaded() {
    this.game = this.navParams.data;
  }

  teamTapped(teamId) {
    let tournayData = this.eliteApi.getCurrentTourney();
    let team = tournayData.teams.find(t => t.id === teamId);
    this.nav.push(TeamHomePage, team);
  }

}
