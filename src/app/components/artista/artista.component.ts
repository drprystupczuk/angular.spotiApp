import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SpotifyService } from "../../services/spotify.service";

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent {

  artista:any = {};
  topTracks:any[] = [];
  loadingArtist:boolean;

  constructor(private router: ActivatedRoute, private spotifyService: SpotifyService) {
    this.spotifyService.getToken().subscribe((data:any) => {
      let token:string = `${data.token_type} ${data.access_token}`;
      this.router.params.subscribe(params => {
          this.getArtista( params['id'] , token);
          this.getTopTracks( params['id'], token);
      })
  });
  }

  getArtista(id:string, token:string){
    this.loadingArtist = true;
    this.spotifyService.getArtista(id, token).subscribe(artista =>{
      this.artista = artista;
      this.loadingArtist = false;
    });
  }

  getTopTracks(id:string, token:string){
    this.spotifyService.getTopTracks(id, token).subscribe(tracks =>{
      this.topTracks = tracks;
    });
  }
}
