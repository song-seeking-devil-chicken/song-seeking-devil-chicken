import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import ProfileContainer from './containers/ProfileContainer';
import SearchContainer from './containers/SearchContainer';
import authStatus from './authCheck';
// eslint-disable-next-line no-unused-vars
import styles from './scss/styles.scss';

const root = createRoot(
  document.getElementById('root'),
);

const auth = authStatus.getAuthStatus;

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App auth={auth} />}>
        <Route path="songsearch" element={<SearchContainer />} />
        <Route path="profile" element={<ProfileContainer />} />
        <Route
          path="*"
          element={(
            <div className="notFound">
              <p>Theres nothing here!</p>
            </div>
          )}
        />
      </Route>
    </Routes>
  </BrowserRouter>,
);
