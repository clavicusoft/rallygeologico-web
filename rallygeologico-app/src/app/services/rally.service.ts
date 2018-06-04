import {Configuration} from "./data/constants";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Rally} from "../model/rally";
import {Observable} from "rxjs/Observable";

@Injectable()
export class RallyService {

    baseUrl: string;
    headers: HttpHeaders = new HttpHeaders();

    constructor(private http : HttpClient, private _configuration: Configuration){
        this.baseUrl = this._configuration.ServerWithApiUrl;
        this.headers.append('Content-Type', 'application/json');
    }

    /**
     * Service for getting all the rallies in descendant order.
     * @returns {Observable<Rally[]>}
     */
    getNewestRallies(): Observable<Rally[]>{
        return this.http.get<Rally[]>(this.baseUrl + "rally/newestRallies.json",{ headers: this.headers, withCredentials: true });
    }

    /**
     * Service for getting a specific rally from database, creates a get request with the id as a parameter
     * @param {number} id
     * @returns {Observable<Rally>}
     */
    getRally(id: number): Observable<Rally>{
        return this.http.get<Rally>(this.baseUrl + "rally/view/"+id+".json",{ headers: this.headers, withCredentials: true });
    }

    /**
     * Service for getting all the rallies
     * @returns {Observable<Rally[]>}
     */
    getAllRallies(): Observable<Rally[]>{
        return this.http.get<Rally[]>(this.baseUrl + "rally.json",{ headers: this.headers, withCredentials: true });
    }

    /**
     * Service for creating a Rally
     * @param {string} name
     * @param {number} points
     * @param {number} latitude
     * @param {number} longitude
     * @param {string} imageUrl
     * @param {string} description
     * @returns {Observable<Rally>}
     */
    adminAddRally(name: string, points: number, latitude: number, longitude: number, imageUrl: string, description: string): Observable<Rally>{
        return this.http.post<Rally>(this.baseUrl + "rally/add.json", {
            'name': name,
            'points_awarded': points,
            'image_url': imageUrl,
            'description': description,
            'latitude': latitude,
            'longitude': longitude,
        },{ headers: this.headers, withCredentials: true })
    }

    /**
     * Service for editing a Rally
     *
     * @param {number} id
     * @param {string} name
     * @param {number} points
     * @param {number} latitude
     * @param {number} longitude
     * @param {string} imageUrl
     * @param {string} description
     * @returns {Observable<Rally>}
     */
    editRally(id: number, name: string, points: number, latitude: number, longitude: number, imageUrl: string, description: string): Observable<Rally>{
        return this.http.post<Rally>(this.baseUrl + "rally/edit/" + id + ".json", {
            'name': name,
            'points_awarded': points,
            'image_url': imageUrl,
            'description': description,
            'latitude': latitude,
            'longitude': longitude,
        },{ headers: this.headers, withCredentials: true })
    }

    /**
     * Service for deleting a Rally
     *
     * @param {number} id
     * @returns {Observable<boolean>}
     */
    deleteRally(id: number): Observable<boolean>{
        return this.http.delete<boolean>(this.baseUrl + "rally/delete/"+id+".json");
    }
}