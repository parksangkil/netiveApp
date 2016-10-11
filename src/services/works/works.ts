import { Injectable }    from '@angular/core';
import { Headers, Http, Response} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Works }           from '../../models/works';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class WorksService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private newsUrl = 'http://www.netive.co.kr/api/works.php';
 
  constructor(private http: Http) {}

  getWorksList(): Observable<Works[]> {
    return this.http.get(this.newsUrl)
                    .map(response => response.json().data as Works[])
                    .catch(this.handleError);
  }

  /*getWorks(id: number): Promise<Works> {
    return this.getWorksList()
               .then(worksList => worksList.find(works => works.id === id));
  }*/

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}