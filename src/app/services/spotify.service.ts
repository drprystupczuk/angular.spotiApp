import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {


  constructor(private http: HttpClient){ }

  getQuery(query:string,token:string){
    if(localStorage.getItem('token')){
      const url = `https://api.spotify.com/v1/${query}`;
      let headers = new HttpHeaders({
          'Authorization': token
      });
      return this.http.get(url, {headers});
    }
  }

  getToken(){
    return this.http.get('https://spotify-get-token.herokuapp.com/spotify/46401e94efac4306afa64c0e1f3564b1/913cafa66e034df390a07dae44b6cbd1');
  }

  getNewReleases(token:string){

    return this.getQuery('browse/new-releases?limite=20',token)
               .pipe(map( data => data['albums'].items ));
  }

  getArtistas(termino:string, token:string){
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`,token)
               .pipe(map(data => data['artists'].items ));
  }

  getArtista(id:string, token:string){
    return this.getQuery(`artists/${id}`,token);
  }

  getTopTracks(id:string, token:string){
    return this.getQuery(`artists/${id}/top-tracks?country=us`,token)
               .pipe(map (data => data['tracks']));
  }
}
