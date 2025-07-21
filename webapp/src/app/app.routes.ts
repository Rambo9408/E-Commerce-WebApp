import { Routes } from '@angular/router';
import { Header } from './components/header/header';
import { Adminlayout } from './components/layout/adminlayout/adminlayout';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home').then((c) => c.Home)
  },
  {
    path: 'header',
    component: Header
  },
  {
    path: 'admin',
    component: Adminlayout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/dashboard/admindashboard/admindashboard').then((c) => c.Admindashboard)
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./components/manage/brands/brands').then((c) => c.Brands)
      },
      {
        path: 'employees',
        loadComponent: () =>
          import('./components/manage/employees/employees').then((c) => c.Employees)
      },
      {
        path: 'employees/add',
        loadComponent: () =>
          import('./components/manage/employee-form/employee-form').then((c) => c.EmployeeForm)
      },
      {
        path: 'employees/:id',
        loadComponent: () =>
          import('./components/manage/employee-form/employee-form').then((c) => c.EmployeeForm)
      },
      {
        path: 'category',
        loadComponent: () =>
          import('./components/manage/category/category').then((c) => c.Category)
      },
      {
        path: 'category/add',
        loadComponent: () =>
          import('./components/manage/category-form/category-form').then((c) => c.CategoryForm)
      },
      {
        path: 'category/:id',
        loadComponent: () =>
          import('./components/manage/category-form/category-form').then((c) => c.CategoryForm)
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./components/manage/product/product').then((c) => c.Product)
      },
       {
        path: 'products/add',
        loadComponent: () =>
          import('./components/manage/product-form/product-form').then((c) => c.ProductForm)
      }
    ]
  },
  {
    path: 'employee',
    loadComponent: () =>
      import('./components/dashboard/employeedashboard/employeedashboard').then((c) => c.Employeedashboard)
  }
];
