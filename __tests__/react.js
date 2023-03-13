import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from '../client/App';
import ProfileRecentlyPlayed from '../client/components/ProfileRecentlyPlayed';
import ProfileUserInfo from '../client/components/ProfileUserInfo';
import SongData from '../client/components/SongData';
import SongSearch from '../client/components/SongSearch';
import Home from '../client/containers/Home';
import ProfileContainer from '../client/containers/ProfileContainer';
import SearchContainer from '../client/containers/SearchContainer';

// tests for rendering each react component
describe('App', () => {
  test('renders App component', () => {
    render(<App />);
  });
});

describe('ProfileRecentlyPlayed', () => {
  test('renders ProfileRecentlyPlayed component', () => {
    render(<ProfileRecentlyPlayed />);
  });
});

// describe('ProfileUserInfo', () => {
//   test('renders ProfileUserInfo component', () => {
//     render(<ProfileUserInfo />);
//   });
// });

// test for react router in index.jsx
jest.mock('../client/App');
jest.mock('../client/containers/Home')
jest.mock('../client/containers/ProfileContainer');
jest.mock('../client/containers/SearchContainer');

test('Testing React routes', () => {
  App.mockImplementation(() => <div>AppMock</div>);
  Home.mockImplementation(() => <div>HomeMock</div>);
  ProfileContainer.mockImplementation(() => <div>ProfileContainerMock</div>);
  SearchContainer.mockImplementation(() => <div>SearchContainerMock</div>);

  render(
    <MemoryRouter>
      <App />
      <Home />
      <SearchContainer />
      <ProfileContainer />
    </MemoryRouter>,
    document.getElementById('root') || document.createElement('div'),
  );

  expect(screen.getByText('AppMock')).toBeInTheDocument();
  expect(screen.getByText('HomeMock')).toBeInTheDocument();
  expect(screen.getByText('ProfileContainerMock')).toBeInTheDocument();
  expect(screen.getByText('SearchContainerMock')).toBeInTheDocument();
});
  