import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent{

  artistas :any[] = [];
  loading : boolean;

  constructor(private spotifyService:SpotifyService) {  }

  buscar(termino:string){
    this.loading = true;
    this.spotifyService.getToken().subscribe((data:any) => {
      this.spotifyService.getArtistas(termino,`${data.token_type} ${data.access_token}`)
      .subscribe((data:any )=>{
          this.artistas = data;
          this.loading = false;
      });
    });
  }
}
