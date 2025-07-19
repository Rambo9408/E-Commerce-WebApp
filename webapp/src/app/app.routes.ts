import { Routes } from '@angular/router';
import { Header } from './components/header/header';

export const routes: Routes = [
    {path:'',loadComponent: () => import('./components/home/home').then(c => c.Home)},
    {path:'header', component: Header},
    {path:'admin/brands',loadComponent: () => import('./components/manage/brands/brands').then(c => c.Brands)},
    {path:'admin/employees',loadComponent: () => import('./components/manage/employees/employees').then(c => c.Employees)},
    {path:'admin/employees/add',loadComponent: () => import('./components/manage/employee-form/employee-form').then(c => c.EmployeeForm)},
    {path:'admin/employees/:id',loadComponent: () => import('./components/manage/employee-form/employee-form').then(c => c.EmployeeForm)},
    {path:'admin/category',loadComponent: () => import('./components/manage/category/category').then(c => c.Category)},
    {path:'admin/category/add',loadComponent: () => import('./components/manage/category-form/category-form').then(c => c.CategoryForm)},
    {path:'admin/category/:id',loadComponent: () => import('./components/manage/category-form/category-form').then(c => c.CategoryForm)},
];
