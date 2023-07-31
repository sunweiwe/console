import { Route, Routes } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';

const Form = lazy(() => import('../form/createForm'));
const FormData = lazy(() => import('../form/render'));
const FormTable = lazy(() => import('../form/table/index'));
const FormListing = lazy(() => import('../form/listing'));

const WorkSpace = lazy(() => import('../workspace/index'));

const CloudTable = lazy(() => import('../cloudTable/cloudTable'));

const Home = lazy(() => import('../home/index'));
const Login = lazy(() => import('../system/login/index'));

const Code = lazy(() => import('../code/index'));

// system
const System = lazy(() => import('../system/index'));
const Menu = lazy(() => import('../system/menu/index'));
const User = lazy(() => import('../system/user/index'));
const Role = lazy(() => import('../system/role/index'));
const Interfaces = lazy(() => import('../system/interface/index'));

function Router() {
  return (
    <Routes>
      <Route path='/system/' element={<System />}>
        <Route path='menu' element={<Menu />} />
        <Route path='user' element={<User />} />
        <Route path='role' element={<Role />} />
        <Route path='interface' element={<Interfaces />} />
      </Route>
      <Route path='/form/listing' element={<FormListing />} />
      <Route path='/form/config' element={<Form />} />
      <Route path='/form/table/:id' element={<FormTable />} />
      <Route path='/form/data' element={<FormData />} />

      <Route path='/cloud/table' element={<CloudTable />} />
      <Route path='/code' element={<Code />} />

      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Home />} />
    </Routes>
  );
}

export default React.memo(Router);
