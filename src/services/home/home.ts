import { Injectable }    from '@angular/core';
import { Headers, Http, Response} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Works }          from '../../models/works';
import { WorkFile }       from '../../models/workFile';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class HomeService {
  private newsUrl  = 'http://www.netive.co.kr/api/home.php';
  private imageUrl = 'http://www.netive.co.kr/api/worksfile.php?wr_id=';
 
  constructor(private http: Http) {}

  getWorksList(): Observable<Works[]> {
    return this.http.get(this.newsUrl)
                    .map(response => response.json().data as Works[])
                    .catch(this.handleError);
  }

  getWorks(id: string): Observable<WorkFile> {
    //alert("wr_id : " + this.imageUrl + id);
    return this.http.get(this.imageUrl + id)
                    .map(response => response.json().file as WorkFile)
                    //.map(this.extractData)
                    .catch(this.handleError);
  }

  getWorksPromise(id: string): Promise<WorkFile> {
    return this.http.get(this.imageUrl + id)
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    //console.log("body : " + JSON.stringify(body));
    return body.file || { };
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}