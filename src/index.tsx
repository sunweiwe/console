import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import store from './store/index';

import 'tailwindcss/tailwind.css';

const App = lazy(() => import('./App'));

const queryClient = new QueryClient();

if (import.meta.hot) {
  import.meta.hot.accept();
}

ReactDOM.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={null}>
          <App />
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>,
  document.querySelector('#root')
);
