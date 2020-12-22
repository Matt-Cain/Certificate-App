import { DatabaseService, Dev } from './../../services/database.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import {IonReorderGroup } from '@ionic/angular';


@Component({
  selector: 'app-developers',
  templateUrl: './developers.page.html',
  styleUrls: ['./developers.page.scss'],
})
export class DevelopersPage implements OnInit {
  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  

  numbers = ['1', '2', '3', '4', '5', '6'];
  developers: Dev[] = [];
  items = [];
  products: Observable<any[]>;
  date = "";
  result = [];
  developer = {};
  product = {};

  selectedView = 'devs';

  constructor(private db: DatabaseService) { }

//data-base
  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getDevs().subscribe(devs => {
          this.developers = devs;
        })
        this.products = this.db.getProducts();
      }
    });
  }

  addDeveloper() {

    this.db.addDeveloper(this.developer['name'], this.developer['skills'], this.developer['img'], this.developer['path'])
      .then(_ => {
        this.developer = {};
      });
  }

  addProduct() {
    this.db.addProduct(this.product['name'], this.product['creator'])
      .then(_ => {
        this.product = {};
      });
  }

  toggleClass = (event) => {
    event.target.classList.toggle('my-class');
  }

  dateChange(e) {
    e.toLocaleDateString()
    return e;
  }

}