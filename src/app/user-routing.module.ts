import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserListComponent } from '../app/user-list/user-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/Users', pathMatch: 'full' }
  , { path: "Users/:pageNumber", component: UserListComponent }
  , { path: "Users", component: UserListComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule { }

export const RoutingComponents = [
  UserListComponent
];
