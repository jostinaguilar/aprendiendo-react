import { lazy, Suspense } from 'react';

import './App.css';
import Home from './pages/Home';
import Page404 from './pages/404';
import Search from './pages/Search';
import { Router } from './Router';
import { Route } from './Route';

const LazyAboutPage = lazy(() => import('./pages/About'));

const appRoutes = [
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/:lang/about',
    Component: LazyAboutPage,
  },
];

function App() {
  return (
    <>
      <h1>midu-router ⚛️</h1>
      <Suspense fallback={<div>Loading ...</div>}>
        <Router routes={appRoutes} defaultComponent={Page404}>
          <Route path={'/about'} Component={LazyAboutPage} />
          <Route path={'/search/:query'} Component={Search} />
        </Router>
      </Suspense>
    </>
  );
}

export default App;
