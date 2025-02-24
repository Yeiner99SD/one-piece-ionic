import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, IonSelect, IonSelectOption, IonToggle, IonGrid, IonRow, IonCol, IonInput, IonIcon, IonCard, IonAvatar, IonCardContent, IonButton, IonSpinner } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';
import { OnePieceService } from 'src/app/services/one-piece.service';
import { Season } from 'src/app/models/season.model';
import { Episode } from 'src/app/models/episode.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonSpinner, IonButton, IonCardContent, IonAvatar, IonCard, IonIcon, IonInput, IonCol, IonRow, IonGrid,  IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,TranslateModule, IonSelect, IonSelectOption ]
})
export class HomePage implements OnInit {

  seasons: Season[] = []
  selectedSeason = ''
  LanguageSvc = inject(LanguageService)
  onePiceSvc = inject(OnePieceService)
  selectedLanguage = ''
  episodes: Episode[] = []
  episode_number = ''
  loading: boolean = false
  limitError: boolean = false
  constructor() { }

  ngOnInit() {
    this.selectedLanguage = localStorage.getItem('language') as string
    this.getSeasons()
  }

 // ===============Cambiar idioma ======================
  setLanguage(){
    this.LanguageSvc.setLanguage(this.selectedLanguage)
    this.getSeasons()
  }

  // ===============dar temporadas ======================
  getSeasons(){

    this.loading = true
    this.onePiceSvc.getSeasons().subscribe({
      next: (res: any) => {
        this.loading= false
        console.log(res)
        this.seasons = res.seasons
        this.selectedSeason = this.seasons[0].id
        this.getEpisodesBySeason()
      },
      error:(err: any) => {
        if(err.status === 429){
          this.loading = false
          this.limitError = true
        }
      }
    })
  }

  // ===============dar episodios por temporada ======================
  getEpisodesBySeason(){
    this.loading = true
    this.onePiceSvc.getEpisodesBySeason(this.selectedSeason).subscribe({
      next: (res: any) => {
      this.loading= false
        console.log(res)
        this.episodes = res.episodes
      }
    })
  }

  getEpisodesByNumber(){
    this.loading = true
    if(this.episode_number){
      this.onePiceSvc.getEpisodesByNumber(this.episode_number).subscribe({
        next: (res: any) => {
          this.loading= false
          console.log(res)
          this.episodes = [res.episode]
        },error: (err: any) => {
          this.episodes =  []
        }
      })
    }
  }


}
