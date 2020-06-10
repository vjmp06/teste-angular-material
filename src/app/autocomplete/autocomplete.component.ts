import { Component, OnInit, Input, Output, EventEmitter, ViewChildren, QueryList  } from '@angular/core';
import {FormControl, NgForm} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent {
  stateCtrl: FormControl;
  filteredStates: Observable<any>;
  selectProjectForNewCollab
  selectProjectForNewCollab1;
  @Input() states;
  @Output() respostaFamilia = new EventEmitter();
  

  constructor() {
    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(null),
        map(project => project && typeof project === 'object' ? project.name : project),
        map(project => this.filterStates(project))
    );
  }

  filterStates(val) {
    return val ? this.states.filter(s => s.name.toLowerCase().indexOf(val.toLowerCase()) === 0)
               : this.states;
  }
  
  displayFn(project): string {
    console.log(project);
      return project ? project.name : project;
  }
   
   setProject(project){
    console.log(this.selectProjectForNewCollab1);
   }

   documentId() {
    this.respostaFamilia.emit(this.selectProjectForNewCollab);
   }

}
