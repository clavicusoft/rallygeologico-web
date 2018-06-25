import { Component, OnInit } from '@angular/core';
import {User} from "../../model/user";
import {DataService} from "../../services/data/data.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Term} from "../../model/term";
import {TermService} from "../../services/term.service";
import {MultimediaService} from "../../services/multimedia.service";
import {Multimedia} from "../../model/multimedia";
import {Site} from "../../model/site";
import {SiteService} from "../../services/site.service";
import {Activity} from "../../model/activity";
import {ActivityService} from "../../services/activity.service";

@Component({
  selector: 'app-activity-term',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.css']
})
export class EditActivityComponent implements OnInit {

  readyToShow : boolean;
  activitySelected : boolean;
  changesSaved: boolean;
  deleted: boolean;
  newActivity: boolean;
  messageType : boolean;

  searchQuery : string = "";
  searchSiteQuery : string = "";
  alertMessage : string = "";
  searchMultimediaQuery = "";

  user: User;
  pageSize : number = 10;
  activeTab : number;

  activities : Activity[];
  allActivities : Activity[];
  showedActivities : Activity[];
  totalActivities : number;
  currentPageActivity : number;
  currentPageSite : number;
  currentPageMultimedia : number;

  multimedia : Multimedia[];
  allMultimedia : Multimedia[];
  totalMultimedia : number = 0;
  otherMultimedia: Multimedia[];
  currentMultimedia : Multimedia[];
  showedMultimedia : Multimedia[];


  currentActivity : Activity;
  currentActivityIndex: number;

  site_id : number;
  activity_type : number;
  points_awarded : number;
  description : string;
  name : string;



  sites : Site[];
  allSites : Site[];
  showedSites : Site[];
  totalSites : number = 0;
  otherSites : Site[];
  currentSites : Site[];

  constructor(private dataService: DataService,
              private activityService: ActivityService,
              private router: Router,
              private userService : UserService,
              private multimediaService : MultimediaService,
              private siteService : SiteService) {
    this.readyToShow = false;
    this.user = this.dataService.getUser();
    if (!this.user) {
      this.userService.isLoggedIn().subscribe((users: User) => {
        if (users[0] && users[0].is_admin == 1) {
          this.dataService.updateUser(users[0]);
          this.user = users[0];
          this.setupData();
        } else {
          this.router.navigate(['/landing']);
        }
      });
    } else {
      this.setupData();
    }
  }

  ngOnInit() {
  }

  setupData(){
    this.activityService.getAllActivities(1).subscribe((activities: Activity[]) => {
      console.log(activities);
      this.allActivities = activities;
      this.reloadActivities(this.allActivities);
      this.allMultimedia = [];
      this.multimediaService.getAllMultimedia().subscribe((multimedia: Multimedia[]) => {
        this.allMultimedia = multimedia;
        this.siteService.getSites().subscribe((sites: Site[]) => {
          this.allSites = sites;
          this.activitySelected = false;
          this.readyToShow = true;
        });
      });
    });
  }


  reloadActivities(activities : Activity[]) : void{
    this.activities = activities;
    this.totalActivities = activities.length;
    this.showedActivities = activities.slice(0, this.pageSize);
    this.currentPageActivity = 0;
  }

  reloadSites(sites : Site[]) : void{
    this.sites = sites;
    this.totalSites = sites.length;
    this.showedSites = sites.slice(0, this.pageSize);
    this.currentPageSite = 0;
  }

  reloadMultimedia(multimedia : Multimedia[]) : void{
    this.multimedia = multimedia;
    this.totalMultimedia = multimedia.length;
    this.showedMultimedia = multimedia.slice(0, this.pageSize);
    this.currentPageMultimedia = 0;
  }

  searchActivity(){
    let termsToShow = [];
    if(this.searchQuery.length >= 1) {
      for (let term of this.allActivities) {
        if (term.name.toLowerCase().startsWith(this.searchQuery.toLowerCase())) {
          termsToShow.push(term);
        }
      }
      this.reloadActivities(termsToShow);
    }else{
      this.reloadActivities(this.allActivities);
    }
  }

  activityPageChange() : void{
    if(this.activities) {
      this.showedActivities = this.activities.slice((this.currentPageActivity - 1) * this.pageSize, ((this.currentPageActivity) * this.pageSize));
    }
  }

  sitePageChange() : void{
    if(this.sites) {
      this.showedSites = this.sites.slice((this.currentPageSite - 1) * this.pageSize, ((this.currentPageSite) * this.pageSize));
    }
  }

  multimediaPageChange() : void{
    if(this.multimedia) {
      this.showedMultimedia = this.multimedia.slice((this.currentPageMultimedia - 1) * this.pageSize, ((this.currentPageMultimedia) * this.pageSize));
    }
  }

  searchSite(){
    let sitesToShow = [];
    if(this.searchSiteQuery.length >= 1) {
      for (let site of this.allSites) {
        if (site.name.toLowerCase().startsWith(this.searchSiteQuery.toLowerCase())) {
          sitesToShow.push(site);
        }
      }
      this.reloadSites(sitesToShow);
    }else{
      this.reloadSites(this.allSites);
    }
  }

  searchMultimedia(){
    let multimediaToShow = [];
    if(this.searchMultimediaQuery.length >= 1) {
      for (let multimedia of this.allMultimedia) {
        if (multimedia.name.toLowerCase().startsWith(this.searchMultimediaQuery.toLowerCase())) {
          multimediaToShow.push(multimedia);
        }
      }
      this.reloadMultimedia(multimediaToShow);
    }else{
      this.reloadMultimedia(this.allMultimedia);
    }
  }


  deleteTerm(id: number, i: number){
    this.deleted = false;
    this.changesSaved = false;
    this.activityService.deleteActivity(id).subscribe((deleted: boolean) => {
      this.deleted = true;
      if (deleted){
        this.currentActivity = null;
        this.allActivities.splice(((this.currentPageActivity - 1) * this.pageSize) + i, 1);
        this.messageType = true;
        this.alertMessage = "Se ha eliminado el término.";
        this.reloadActivities(this.allActivities);
      } else {
        this.messageType = false;
        this.alertMessage = "No se pudo eliminar el término.";
      }
    });
  }


  edit(i: number){
    this.readyToShow = false;
    this.activeTab = 0;
    this.activitySelected = true;
    this.changesSaved = false;
    this.deleted = false;
    if (i == -1){
      this.newActivity = true;
      this.currentActivity = null;
    } else {
      this.currentActivity = this.showedActivities[i];
      this.currentActivityIndex = ((this.currentPageActivity - 1) * this.pageSize) + i;
    }
    this.editTermChange();
  }

  editTermChange(){
    if (!this.currentActivity){
      this.name = "";
      this.description = "";
    } else {
      this.name = this.currentActivity.name;
      this.description = this.currentActivity.description;
      this.site_id = this.currentActivity.site_id;
      this.points_awarded = this.currentActivity.points_awarded;
      this.activity_type = this.currentActivity.activity_type;
    }
    this.readyToShow = true;
  }

  goBack(){
    this.activitySelected = false;
    this.currentActivity = null;
    this.reloadActivities(this.allActivities);
  }

  changeTab(i: number){
    this.activeTab = i;
    this.changesSaved = false;
    this.deleted = false;
    if (i == 1){
      this.updateSites();
    }
    else if (i == 2){
      this.updateMultimedia();
    }
  }

  updateSites(){
    this.allSites = [];
    this.siteService.getOtherSitesFromTerm(this.currentActivity.id).subscribe((otherSites: Site[]) => {
      this.otherSites = otherSites;
      this.siteService.getAssociatedSitesFromTerm(this.currentActivity.id).subscribe((currentSites: Site[]) => {
        this.currentSites = currentSites;
        for(let site of this.otherSites){
          this.allSites.push(site);
        }
        for(let site of this.currentSites){
          this.allSites.push(site);
        }
        this.reloadSites(this.allSites);
      });
    });
  }

  updateMultimedia(){
    this.allMultimedia = [];
    this.multimediaService.getOtherMultimediaFromActivity(this.currentActivity.id).subscribe((otherMultimedia: Multimedia[]) => {
      this.otherMultimedia = otherMultimedia;
      this.multimediaService.getAssociatedMultimediaFromActivity(this.currentActivity.id).subscribe((currentMultimedia: Multimedia[]) => {
        this.currentMultimedia = currentMultimedia;
        for(let multimedia of this.otherMultimedia){
          this.allMultimedia.push(multimedia);
        }
        for(let multimedia of this.currentMultimedia){
          this.allMultimedia.push(multimedia);
        }
        this.reloadMultimedia(this.allMultimedia);

      });
    });
  }

  saveChanges(){
    this.changesSaved = false;
    this.deleted = false;
    if (!this.currentActivity){
      this.activityService.addActivity(this.site_id, this.activity_type, this.points_awarded, this.name, this.description).subscribe((activity: Activity) => {
        if (activity){
          this.currentActivity = activity;
          this.allActivities.push(this.currentActivity);
          this.changesSaved = true;
          this.messageType = true;
          this.newActivity = false;
          this.alertMessage = "La actividad ha sido creada.";
        } else {
          this.messageType = false;
          this.alertMessage = "No se pudo crear la actividad.";
        }
      });
    } else {
      this.activityService.editActivity(this.currentActivity.id, this.site_id, this.activity_type, this.points_awarded, this.description, this.name).subscribe((activity: Activity) => {
        this.changesSaved = true;
        if (activity){
          this.currentActivity = activity;
          this.allActivities[this.currentActivityIndex] = this.currentActivity;
          this.messageType = true;
          this.alertMessage = "Se han guardado los cambios.";
        } else {
          this.alertMessage = "No se pudo guardar los cambios.";
          this.messageType = false;
        }
      });
    }
  }

  /**
   * Returns if the specified site is actually part of the current term
   *
   * @param {Site} site
   * @returns {boolean}
   */
  belongsTo(id: number): boolean{
    for(let currentSite of this.currentSites){
      if (id == currentSite.id){
        return true;
      }
    }
    return false;
  }

  /*/!**
   * Adds a termSite relation between the current term and the site on the specified position
   *
   * @param {number} i
   *!/
  addTermSite(i : number){
    this.changesSaved = false;
    this.activityService.addTermSite(this.currentActivity.id,i).subscribe((term: Term) =>{
      this.changesSaved = true;
      if(term){
        this.updateSites();
        this.reloadSites(this.allSites);
        this.messageType = true;
        this.alertMessage = "Se ha agregado el sitio al rally seleccionado."
      } else {
        this.messageType = false;
        this.alertMessage = "No se pudo agregar el sitio al rally seleccionado."
      }
    });
  }

  /!**
   * Deletes the rallySite relation between the current rally and the site on the specified position
   *
   * @param {number} i
   *!/
  deleteTermSite(i: number){
    this.changesSaved = false;
    this.activityService.getTermSite(this.currentActivity.id, i).subscribe((id: number) => {
      this.activityService.deleteTermSite(id).subscribe((deleted: boolean) => {
        this.changesSaved = true;
        if (deleted) {
          this.updateSites();
          this.reloadSites(this.allSites);
          this.messageType = true;
          this.alertMessage = "Se ha eliminado el sitio del rally seleccionado."
        } else {
          this.messageType = false;
          this.alertMessage = "No se pudo eliminal el sitio del rally seleccionado."
        }
      });
    });
  }*/

  /**
   * Returns if the specified site is actually part of the current term
   *
   * @param {Multimedia} multimedia
   * @returns {boolean}
   */
  multimediaBelongsTo(id: number): boolean{
    for(let currentMultimedia of this.currentMultimedia){
      if (id == currentMultimedia.id){
        return true;
      }
    }
    return false;
  }

  /**
   * Adds a termMultimedia relation between the current term and the site on the specified position
   *
   * @param {number} i
   */
  addActivityMultimedia(i : number){
    this.changesSaved = false;
    this.activityService.addActivityMultimedia(this.currentActivity.id, i).subscribe((activity: Activity) =>{
      this.changesSaved = true;
      if(activity){
        this.updateMultimedia();
        this.reloadMultimedia(this.allMultimedia);
        this.messageType = true;
        this.alertMessage = "Se ha agregado el sitio al rally seleccionado."
      } else {
        this.messageType = false;
        this.alertMessage = "No se pudo agregar el sitio al rally seleccionado."
      }
    });
  }

  /**
   * Deletes the termMultimedia relation between the current rally and the site on the specified position
   *
   * @param {number} i
   */
  deleteActivityMultimedia(i: number){
    this.changesSaved = false;
    this.activityService.getActivityMultimedia(this.currentActivity.id, i).subscribe((id: number) => {
      this.activityService.deleteActivityMultimedia(id).subscribe((deleted: boolean) => {
        this.changesSaved = true;
        if (deleted) {
          this.updateMultimedia();
          this.reloadMultimedia(this.allMultimedia);
          this.messageType = true;
          this.alertMessage = "Se ha eliminado el sitio del rally seleccionado."
        } else {
          this.messageType = false;
          this.alertMessage = "No se pudo eliminal el sitio del rally seleccionado."
        }
      });
    });
  }




}
