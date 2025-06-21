import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WeightsComponent } from './weights/weights.component';
import { AddWeight } from './add-weight/add-weight';
import { EditWeight } from './edit-weight/edit-weight';
import { RegisterUser } from './register/register';
import { MealsComponent } from './meals/meals';
import { AddMealComponent } from './add-meal/add-meal';
import { EditMealComponent } from './edit-meal/edit-meal';
import { WorkoutsComponent } from './workouts/workouts';
import { EditWorkoutComponent } from './edit-workout/edit-workout';
import { AddWorkoutComponent } from './add-workout/add-workout';
import { DailyStats } from './daily-stats/daily-stats';
import { HomeComponent } from './home/home.component';


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
    { path: '', component: HomeComponent}
];
