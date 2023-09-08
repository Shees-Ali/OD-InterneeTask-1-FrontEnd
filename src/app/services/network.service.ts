import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  constructor(
    public api: ApiService,
    public router: Router,
    public utility: UtilityService
  ) {}

  // Network call for adding a task
  addTask(task: any) {
    return this.httpPostResponse('tasks', task);
  }

  // Network call for getting all tasks
  getTasksList(obj: any) {
    const params = this.serialize(obj);
    let url = 'tasks' + (params ? '?' + params : '');
    return this.httpGetResponse(url);
  }

  // Network call for getting a task
  getTaskDetail(id: string) {
    return this.httpGetResponse('tasks/' + id);
  }

  // Network call for updating a task
  updateTask(id: string, task: any) {
    return this.httpPutResponse('tasks/' + id, task);
  }

  // Network call for deleting a task
  deleteTask(id: string) {
    return this.httpDeleteResponse('tasks/' + id);
  }

  // Network call for logging In
  login(body: any) {
    return this.httpPostResponse('auth/login', body);
  }

  // Network call for registering new user
  register(body: any) {
    return this.httpPostResponse('auth/register', body);
  }

  // Network call to get current user
  getCurrentUser() {
    return this.httpGetResponse('auth/get-current-user');
  }

  // Network calls for ChatBot
  chat(messages: any) {
    return this.httpPostResponse('chat/conversation', messages);
  }

  QNAChat(message: string) {
    return this.httpGetResponse('chat/start?question=' + message);
  }

  // Function for making url string from object of url params.
  serialize = (obj: any) => {
    const str: any[] = [];
    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        let f: string =
          encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]);
        str.push(f);
      }
    }
    return str.join('&');
  };

  // Function for POST method
  httpPostResponse(
    key: any,
    data: any,
    id = null,
    showloader = true,
    showError = true,
    contenttype = 'application/json'
  ) {
    return this.httpResponse(
      'post',
      key,
      data,
      id,
      showloader,
      showError,
      contenttype
    );
  }

  // Function for GET method
  httpGetResponse(
    key: any,
    id = null,
    showloader = true,
    showError = true,
    contenttype = 'application/json'
  ) {
    return this.httpResponse(
      'get',
      key,
      {},
      id,
      showloader,
      showError,
      contenttype
    );
  }

  // Function for PUT method
  httpPutResponse(key: any, data: any, id = null) {
    return new Promise<any>((resolve, reject) => {
      this.api.put(key, data).subscribe((res: any) => {
        resolve(res);
      });
    });
  }

  // Function for PATCH method
  httpPatchResponse(key: any, data: any, id = null) {
    return new Promise<any>((resolve, reject) => {
      this.api.patch(key, data).subscribe((res: any) => {
        resolve(res);
      });
    });
  }

  // Function for DELETE method
  httpDeleteResponse(key: any) {
    return new Promise<any>((resolve, reject) => {
      this.api.delete(key).subscribe((res: any) => {
        resolve(res);
      });
    });
  }

  // Main function for makinf HTTP calls.
  httpResponse(
    type = 'get',
    key: any,
    data: any,
    id = null,
    showloader = true,
    showError = true,
    contenttype = 'application/json'
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      if (showloader === true) {
        this.utility.showLoader();
      }

      const url = key + (id ? '/' + id : '');

      const seq =
        type === 'get' ? this.api.get(url, {}) : this.api.post(url, data);

      seq.subscribe(
        (res: any) => {
          if (showloader === true) {
            this.utility.hideLoader();
          }
          resolve(res);
        },
        (err) => {
          this.utility.hideLoader();
          this.utility.presentFailureAlert(err.error.title);
          reject(err.error);
        }
      );
    }).catch((err) => {
      if (err.status == 'Error') {
        this.utility.presentFailureAlert(err.message);
        if (err.message == 'User Not Logged In!') {
          this.router.navigate(['']);
        }
      }
    });
  }
}
