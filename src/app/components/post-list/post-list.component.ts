import { Component } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../data/post';
import { OnInit } from '@angular/core';

@Component({
    selector: 'app-post-list-bar',
    templateUrl: './post-list.component.html',
    standalone: false,
    styleUrls: ['./post-list.component.css'],
})

export class PostListComponent implements OnInit {
    posts: Post[] = [];

    constructor(private postService: PostService) { }

    ngOnInit(): void {
        this.loadPosts();
    }

    loadPosts(): void {
        this.postService.getPosts().subscribe(posts => {
            this.posts = posts;
        })
    }
}