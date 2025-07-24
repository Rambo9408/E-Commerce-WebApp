import { Routes } from '@angular/router';
import { Header } from './components/header/header';
import { Adminlayout } from './components/layout/adminlayout/adminlayout';
import { Employeelayout } from './components/layout/employeelayout/employeelayout';
import { Customerlayout } from './components/layout/customerlayout/customerlayout';
import { AuthGuard } from './guards/auth-guard';

//lazy-loaded components
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
    canActivateChild: [AuthGuard],
    data: { role: 'admin' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/dashboard/admindashboard/admindashboard').then((c) => c.Admindashboard)
      },
      {
        path: 'productDetails/:id',
        loadComponent: () =>
          import('./components/manage/productdetails/productdetails').then((c) => c.Productdetails)
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
    component: Employeelayout,
    canActivateChild: [AuthGuard],
    data: { role: 'employee' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/dashboard/employeedashboard/employeedashboard').then((c) => c.Employeedashboard)
      }
    ]
  },
  {
    path: 'user',
    component: Customerlayout,
    canActivateChild: [AuthGuard],
    data: { role: 'customer' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/dashboard/customerdashboard/customerdashboard').then((c) => c.Customerdashboard)
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
