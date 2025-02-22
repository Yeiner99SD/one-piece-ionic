import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, IonSelect, IonSelectOption, IonToggle, IonGrid, IonRow, IonCol, IonInput, IonIcon } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';
import { OnePieceService } from 'src/app/services/one-piece.service';
import { Season } from 'src/app/models/season.mode';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonIcon, IonInput, IonCol, IonRow, IonGrid,  IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,TranslateModule, IonSelect, IonSelectOption ]
})
export class HomePage implements OnInit {

  seasons: Season[] = []
  selectedSeason = ''
  LanguageSvc = inject(LanguageService)
  onePiceSvc = inject(OnePieceService)
  selectedLanguage = ''

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
    this.onePiceSvc.getSeasons().subscribe({
      next: (res: any) => {
        console.log(res)
        this.seasons = res.seasons
        this.selectedSeason = this.seasons[0].id
        this.getEpisodesBySeason()
      }
    })
  }

  // ===============dar episodios por temporada ======================
  getEpisodesBySeason(){
    this.onePiceSvc.getEpisodesBySeason(this.selectedSeason).subscribe({
      next: (res: any) => {
        console.log(res)
        
      }
    })
  }
  

}
