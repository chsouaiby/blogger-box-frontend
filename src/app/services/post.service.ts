import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of} from 'rxjs';

import { POSTS, Post } from '../data/post';
import { environment } from "../environment/environment";

@Injectable()
export class PostService {

    private postsUrl = `${environment.apiUrl}v1/posts`;

    constructor(private http: HttpClient){}

    getPosts(): Observable<Post []> {
        /*const posts = of(POSTS);
        return posts;*/
        return this.http.get<Post[]>(this.postsUrl);
    }

    create(post: PostCreateInput): Observable<Post> {
        return this.http.post<Post>(this.postsUrl, post);
    }

    update(post: Post): Observable<Post> {
        return this.http.put<Post>(this.postsUrl, post)
        .pipe(
            catchError(this.handleError<Post>('update', post))
            );  
    }

    delete(post: Post): Observable<boolean> {
        return this.http.delete<boolean>(`${this.postsUrl}/${post.id}`);
    }

    protected handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(`${operation} failed: ${error.message}`, error); // log to console
            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

}