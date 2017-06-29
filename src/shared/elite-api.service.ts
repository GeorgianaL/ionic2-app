import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EliteApi {
  private baseUrl='https://elite-schedule-ionic2-app.firebaseio.com';
  currentTournay: any = {};

  constructor (private http: Http) {

  }

  getTournaments() {
    return new Promise(resolve => {
      this.http.get(`${this.baseUrl}/tournaments.json`)
        .subscribe(res => resolve(res.json()));
    });
  }

  getTournamentData(tournayId) : Observable<any> {
    return this.http.get(`${this.baseUrl}/tournaments-data/${tournayId}.json`)
                .map((response: Response) => {
                      this.currentTournay = response.json();
                      return this.currentTournay;
      });
  }

  getCurrentTourney() {
    return this.currentTournay;
  }
}
