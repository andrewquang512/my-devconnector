import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import './App.css';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  // ? If you want to run an effect and clean it up only once (on mount and unmount)
  // ? you can pass an empty array ([]) as a second argument
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route
              path='/register'
              element={
                <section className='container'>
                  <Alert />
                  <Register />
                </section>
              }
            />
            <Route
              path='/login'
              element={
                <section className='container'>
                  <Alert />
                  <Login />
                </section>
              }
            />
            {/* //? React router v5 PrivateRoute syntax */}
            {/* <PrivateRoute
              path='/dashboard'
              element={
                <section className='container'>
                  <Alert />
                  <Dashboard />
                </section>
              }
            /> */}
            <Route
              path='/dashboard'
              element={
                <PrivateRoute>
                  <section className='container'>
                    <Alert />
                    <Dashboard />
                  </section>
                </PrivateRoute>
              }
            />
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
