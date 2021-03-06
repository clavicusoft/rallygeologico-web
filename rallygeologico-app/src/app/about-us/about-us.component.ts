import { Component, OnInit } from '@angular/core';
import {User} from "../model/user";
import {DataService} from "../services/data/data.service";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  user : User;
  searchQuery : string = "";
  assetsUrl: string;

  constructor(private dataService:DataService, private router: Router, private  userService:UserService) {
    this.assetsUrl = environment.assetsUrl;
    this.user = this.dataService.getUser();
    if (!this.user){
      this.userService.isLoggedIn().subscribe((users: User) => {
        if(users[0]){
          this.dataService.updateUser(users[0]);
          this.user = users[0];
        }
      });
    }
  }

  ngOnInit() {
  }



}
