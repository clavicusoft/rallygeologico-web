import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  assetsUrl: string;

  constructor() {
    this.assetsUrl = environment.assetsUrl;
  }

  ngOnInit() {
  }

}
