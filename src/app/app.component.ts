import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import { SwapiService } from './swapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ng-observable';
  private results = [];
  
  searchForm  = new FormGroup(
    {
      term: new FormControl(''),
    }
  );

  constructor(private service: SwapiService) {}

  ngOnInit(){
    const termField = this.searchForm.get('term');
    let debounce = termField.valueChanges.pipe(
      debounceTime(1000), // delay 1000 msec
      distinctUntilChanged() // only for changed value
    );
    debounce.subscribe(changes => {
      console.log(changes);
      this.service.searchSWCharacter(changes)
      .subscribe((data: any) => {
        console.log(data);
        this.results = data.results;
      })
      
    });
  }
  
}
