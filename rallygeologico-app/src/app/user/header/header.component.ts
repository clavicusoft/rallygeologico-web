import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../model/user";
import {DataService} from "../../services/data/data.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    @Input() activeTab: number;

    user:User;
    readyToShow: boolean = false;
    assetsUrl: string;

    constructor(private userService: UserService,private router: Router,  private dataService: DataService) {
        this.assetsUrl = environment.assetsUrl;
        this.user = this.dataService.getUser();
        if (!this.user){
            this.userService.isLoggedIn().subscribe((users: User) => {
                if(users[0]){
                    this.dataService.updateUser(users[0]);
                    this.user = users[0];
                    this.readyToShow = true;
                } else {
                    this.router.navigate(['/landing']);
                }
            });
        } else {
            this.readyToShow = true;
        }
    }

    ngOnInit(){

    }

    isActive(active){
        return (this.activeTab === active);
    }

    changeActive(active){
      this.activeTab = active;
    }

    logout() {
        this.userService.logout().subscribe((user: User)=>{
            console.log(user);
            this.dataService.updateUser(null);
            setTimeout(() =>
                {
                    this.router.navigate(['/landing']);
                },
                1000);
        } );
    }
}
