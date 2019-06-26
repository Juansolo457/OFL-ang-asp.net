import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model'
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[]  = [];
  isFetching = false; 

  constructor(private http: HttpClient, private postService: PostsService) {}
 
  ngOnInit() {
    this.isFetching = true; 
    this.postService.fetchPosts().subscribe(posts => {
      this.isFetching = false; 
      this.loadedPosts = posts; 
    });
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.postService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    this.isFetching = true; 
    this.postService.fetchPosts().subscribe(posts => {
      this.isFetching = false; 
      this.loadedPosts = posts; 
    });
  }

  onClearPosts() { 
this.postService.deletePosts()
  }
}

// per bman - says that the manip fo the data is here in the comp lvl - needs to be moved to a svc lvl
// so its more centralized and we don't have to use a big Tunnel of DI to get the data shared around.. 
 