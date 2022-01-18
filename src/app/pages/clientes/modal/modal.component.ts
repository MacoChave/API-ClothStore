import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cliente-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  host: { class: 'rootModal' },
})
export class ModalComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
