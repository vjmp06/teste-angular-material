import {Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList} from '@angular/core';
import { NgForm} from '@angular/forms';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';

class LinkedNode<T> {
  private _elem: T;
  public next: LinkedNode<T> | null;

  constructor(elem: T) {
      this._elem = elem;
      this.next = null;
  }

  get elem(): T {
      return this._elem;
  }
}

class LinkedList<T> {
  private head: LinkedNode<T> | null = null;
  private len = 0;

  constructor(headElement?: LinkedNode<T>) {
      this.head = headElement || null;
  }

  public add(elem: T) {
      let node = new LinkedNode(elem);
      let current: LinkedNode<T>;

      if (this.head === null) {
          this.head = node;
      } else {
          current = this.head;
          while (current.next) {
              current = current.next;
          }
          current.next = node;
      }
      this.len++;
  }

  public remove(pos: number): LinkedNode<T> | null {
      if (pos > -1 && pos < this.len && this.head) {
          let current = this.head;
          let previous: LinkedNode<T> = current;
          let index = 0;

          if (pos === 0) {
              this.head = current.next;
          } else {
              while (index++ < pos && current.next) {
                  previous = current;
                  current = current.next;
              }
              previous.next = current.next;
          }
          this.len--;
          return current;
      } else {
          return null;
      }
  }


  public insert(elem: T, pos: number) {
      if (pos > -1 && pos < this.len && this.head) {
          let current = this.head;
          let index = 0;
          let previous = current;
          let node = new LinkedNode(elem);

          if (pos === 0) {
              node.next = current;
              this.head = node;
          } else {
              while (index++ < pos && current.next) {
                  previous = current;
                  current = current.next;
              }
              node.next = current;
              previous.next = node;
          }
          this.len++;
          return true;
      } else {
          return false;
      }
  }

  public toString() {
      var current = this.head;
      var str = '';
      while (current) {
          str += current.elem;
          current = current.next;
      }
      return str;
  }
}

export interface Numero {
  id: number;
  extenso: string;
}

const ELEMENT_DATA: any[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('state', {static: false}) state: ElementRef;
  @ViewChildren('teste') teste: QueryList<AutocompleteComponent>;
  listaAutoComplete: LinkedList<AutocompleteComponent>;

  states = [
    { name: "Name 1" , id: "1", photo: "test1"},
    { name: "Name 2" , id: "2", photo: "test2"},
    { name: "Name 3" , id: "3", photo: "test3"},
  ]; 
  
  onSubmit(form: NgForm) {
    console.log(this.state);
    console.log(form)
  }

  recebeId($event) {
    console.log("Ta aqui os dados oh!");
    console.log($event);
  }

  adicionar() {
    this.listaAutoComplete.add(new AutocompleteComponent);
   }

  remover(evento, comp: AutocompleteComponent) {
    console.log(comp);
    //this.listaAutoComplete.remove();
   }

   displayedColumns =
      ['name', 'position', 'weight', 'symbol', 'position', 'weight', 'symbol', 'star'];
  dataSource = ELEMENT_DATA;
}