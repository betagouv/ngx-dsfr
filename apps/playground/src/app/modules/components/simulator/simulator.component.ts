/**
 * Angular imports
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'play-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class SimulatorComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
