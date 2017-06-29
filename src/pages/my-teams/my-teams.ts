import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { TournamentsPage } from '../pages';
import { EliteApi } from '../../shared/shared';
import {TeamHomePage} from "../team-home/team-home";

@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html',
})
export class MyTeamsPage {

  favorites = [
    {
      team: {id: 6182, name: 'HC Elite 7th', coach: 'Georgiana'},
      tournamentId: 'ad3535vg3',
      tournamentName: 'March Madness Tournament'
    },
    {
      team: {id: 6202, name: 'HC Elite', coach: 'Georgiana'},
      tournamentId: 'ad3535vg3',
      tournamentName: 'Holiday Hoops Tournament'
    }
  ];

  constructor(public nav: NavController,
              public navParams: NavParams,
              private loadingController: LoadingController,
              private eliteApi: EliteApi) {
  }

  goToTournament() {
    this.nav.push(TournamentsPage)
  }

  favoriteTapped($event, favorite) {
    let loader = this.loadingController.create({
      content: 'Getting data',
      dismissOnPageChange: true
    });
    loader.present();
    this.eliteApi.getTournamentData(favorite.team.id)
      .subscribe(t => this.nav.push(TeamHomePage, favorite.team));
  }

}
