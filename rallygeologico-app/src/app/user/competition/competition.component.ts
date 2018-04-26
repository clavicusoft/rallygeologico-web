import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {DataService} from "../../services/data/data.service";
import {User} from "../../model/user";
import {InvitationService} from "../../services/invitation.service";
import {Invitation} from "../../model/invitation";
import {ActivatedRoute, Params} from "@angular/router";
import {CompetitionService} from "../../services/competition.service";
import {Competition} from "../../model/competition";

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent implements OnInit {

    pageSize : number = 10;
    currentPage : number = 0;
    totalUsers : number = 0;

    searchQuery : string = "";

    competition: Competition;
    competitionId: number;

    user: User;
    users : User[];
    allUsers: User[];
    showedUsers: User[];

    constructor(private userService: UserService, private dataService: DataService, private invitationService: InvitationService, private route: ActivatedRoute, private competitionService: CompetitionService) {
        this.user = this.dataService.getUser();
        this.userService.getUsers().subscribe((users: User[]) => {
          this.allUsers = users;
          this.reloadUsers(users);
        });
    }

    reloadUsers(users : User[]) : void{
        this.users = users;
        this.totalUsers = users.length;
        this.showedUsers = users.slice(0, this.pageSize);
        this.currentPage = 0;
    }

    pageChange() : void{
        if(this.users) {
            this.showedUsers = this.users.slice((this.currentPage - 1) * this.pageSize, ((this.currentPage) * this.pageSize));
        }
    }

    searchUser(){
        let usersToShow = [];

        if(this.searchQuery.length >= 1) {
            for (let user of this.users) {
                if (user.username.toLowerCase().startsWith(this.searchQuery.toLowerCase())) {
                    usersToShow.push(user);
                }
            }
            this.reloadUsers(usersToShow);
        }else{
            this.reloadUsers(this.allUsers);
        }
    }

    invite (index: number){
        this.invitationService.sendInvitation(this.competitionId, this.showedUsers[index].id, this.user.id).subscribe((invitation: string) => {
            console.log("Invitation sent");
        });
    }

    ngOnInit() {
        this.route.params
            .subscribe(
                (params: Params) => {
                    this.competitionId = this.route.snapshot.params['competitionId'];
                    console.log("Competition Id = " + this.competitionId);
                    this.competitionService.findCompetition(this.competitionId).subscribe((competition: Competition) => {
                        this.competition = competition;
                    });
                }
            );
    }

}
