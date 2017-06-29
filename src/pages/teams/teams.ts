import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { EliteApi } from '../../shared/shared';
import * as _ from 'lodash';
import { TournamentsPage, TeamDetailPage, TeamHomePage } from '../pages';

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {
  private allTeams: any;
  private allTeamDivision: any;
  teams = [];


  constructor(public nav: NavController,
              public navParams: NavParams,
              private eliteApi: EliteApi,
              private loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    let selectedTourney = this.navParams.data;

    let loader = this.loadingController.create({
      content: 'Getting data'
    });

    loader.present().then(() => {
      this.eliteApi.getTournamentData(selectedTourney.id).subscribe(data => {
        this.allTeams = data.teams;
        this.allTeamDivision =
          _.chain(data.teams)
            .groupBy('division')
            .toPairs()
            .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
            .value();
        this.teams = data.allTeamDivision;
        console.log('division teams', this.allTeams);
        console.log('division teams', this.allTeamDivision);
        loader.dismiss();
      });
    });
  }

  itemTapped($event, team) {
    this.nav.push(TeamHomePage, team);
  }

}
