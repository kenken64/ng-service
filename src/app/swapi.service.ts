import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  constructor(private http: HttpClient) { }

  searchSWCharacter(changes): Observable<any>{
    return this.http.get(`https://swapi.co/api/people/?search=${changes}`);
  }
}
