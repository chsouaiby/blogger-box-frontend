import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostListComponent } from './components/post-list/post-list.component';
import { AddPostComponent } from './components/add-post/add-post.component';

const routes: Routes = [
  { path: 'home', component: PostListComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'add-post', component: AddPostComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
