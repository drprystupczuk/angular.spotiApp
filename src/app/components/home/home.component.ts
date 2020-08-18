import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent{

  nuevasCanciones: any[] = [];
  loading:boolean;
  error:boolean;
  mensajeError:string;

  constructor(private spotifyService:SpotifyService) {

    this.loading = true;
    this.error = false;

    this.spotifyService.getToken().subscribe((data:any) => {

      this.spotifyService.getNewReleases(`${data.token_type} ${data.access_token}`)
      .subscribe((data:any) => {
          this.nuevasCanciones = data;
          this.loading = false;
      }, (errorPeticion) => {
          this.loading = false;
          this.error = true;
          this.mensajeError = errorPeticion.error.error.message;
      });
    });
   }
}
