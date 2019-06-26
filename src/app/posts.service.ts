import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Post} from './post.model'; 
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {

    constructor(private http: HttpClient) {}
    //have http reqs here..
    createAndStorePost(title: string, content: string){
        const postData: Post = {title: title, content: content};
        this.http
        .post<{ name: string }>(  //optional but recommended. 
          'https://ng-complete-guide-c5286.firebaseio.com/posts.json',  // the posts.json is a FIREBASE req.
          postData
        )
        .subscribe(responseData => {
          console.log(responseData);
        });
    }

    fetchPosts() {  //find out whats going on with the data transform.. 
        return this.http
      .get('https://ng-complete-guide-c5286.firebaseio.com/posts.json')
      .pipe(
        map((responseData: {[key: string]: Post}) => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        })
      )
    }

    deletePosts(){
      this.http.delete('https://ng-complete-guide-c5286.firebaseio.com/posts.json')
    }
}