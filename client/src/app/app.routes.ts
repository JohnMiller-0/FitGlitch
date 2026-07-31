import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WeightsComponent } from './Dashboard/weights/weights.component';
import { AddWeight } from './Add-Forms/add-weight/add-weight';
import { EditWeight } from './Edit-Forms/edit-weight/edit-weight';
import { RegisterUser } from './register/register';
import { MealsComponent } from './Dashboard/meals/meals';
import { AddMealComponent } from './Add-Forms/add-meal/add-meal';
import { EditMealComponent } from './Edit-Forms/edit-meal/edit-meal';
import { WorkoutsComponent } from './Dashboard/workouts/workouts';
import { EditWorkoutComponent } from './Edit-Forms/edit-workout/edit-workout';
import { AddWorkoutComponent } from './Add-Forms/add-workout/add-workout';
import { DailyStats } from './Dashboard/daily-stats/daily-stats';
import { HomeComponent } from './Dashboard/home/home.component';
import { Macros } from './Dashboard/macros/macros';


export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'weights', component: WeightsComponent},
    { path: 'add-weight', component: AddWeight},
    { path: 'edit-weight', component: EditWeight },
    { path: 'register', component: RegisterUser},
    { path: 'meals', component: MealsComponent },
    { path: 'add-meal', component: AddMealComponent},
    { path: 'edit-meal', component: EditMealComponent},
    { path: 'workouts', component: WorkoutsComponent },
    { path: 'edit-workout', component: EditWorkoutComponent },
    { path: 'add-workout', component: AddWorkoutComponent },
    { path: 'daily-stats', component: DailyStats},
    { path: 'macros', component: Macros},
    { path: '', component: HomeComponent}
];
