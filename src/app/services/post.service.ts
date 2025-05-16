import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, map} from 'rxjs';

import { Post } from '../data/post';
import { environment } from "../environment/environment.prod";


export type PostCreateInput = Omit<Post, 'id' | 'createdDate' | 'category'> & {
    categoryId: string; // UUID
};

export type PostCreateInputWithIsActive = Omit<Post, 'id' | 'createdDate'> & {
    isActive: boolean;
};

export type PostWithTimestamp = Omit<Post, 'createdDate'> & {
  createdDate: number;
};


@Injectable()
export class PostService {

    private postsUrl = `${environment.apiUrl}v1/posts`;

    constructor(private http: HttpClient){}

    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(this.postsUrl).pipe(
            map(posts => posts.map(post => ({
            ...post,
            createdDate: new Date(post.createdDate)
            })))
        );
    }


    create(post: PostCreateInput): Observable<Post> {
        return this.http.post<Post>(this.postsUrl, post).pipe(
            map(post => ({
            ...post,
            createdDate: new Date(post.createdDate)
            }))
        );
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
            console.error(`${operation} failed: ${error.message}`, error); 
            return of(result as T);
        };
    }
}