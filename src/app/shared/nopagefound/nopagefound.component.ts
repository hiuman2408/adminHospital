import { Component, OnInit } from '@angular/core';

declare function init_plugins(); //par que desparesca el loooding

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styleUrls: ['./nopagefound.component.css']
})
export class NopagefoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins()
  }

}
