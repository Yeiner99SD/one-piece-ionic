import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OnePieceService {

  private http = inject(HttpClient)
  constructor() { }

  getSeasons(){
    return this.http.get(`${environment.baseUrl}${environment.seasons}`)
  }

  getEpisodesBySeason(id : string){
    return this.http.get(environment.baseUrl + environment.episodes_by_season + id)
  }


  getEpisodesByNumber(number: string){
    return this.http.get(environment.baseUrl + environment.episode+ number )
  }
}
