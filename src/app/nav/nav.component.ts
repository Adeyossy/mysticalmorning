import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  linkItems = ['meals', 'menu', 'nutrition'];

  @Input() isModalShown = false;
  @Output() preorder = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  emitPreorder(): void {
    this.preorder.emit();
  }

}
