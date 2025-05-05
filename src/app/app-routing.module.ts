import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostListComponent } from './components/post-list/post-list.component';

const routes: Routes = [
  { path: 'home', component: PostListComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

// const routes: Routes = [
//   { path: 'home', component: AppComponent },
//   { path: 'users', component: UsersListComponent },
//   { path: 'users/:id', component: UserDetailsComponent },
//   { path: '', redirectTo: '/home', pathMatch: 'full' },
// ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
