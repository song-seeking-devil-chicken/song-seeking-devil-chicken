import React from 'react';
import userEvent from '@testing-library/user-event'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import App from '..client/App';
import SongData from '..client/components/SongData';
import SongSearch from '..client/components/SongSearch';
import ProfileContainer from '..client/containers/ProfileContainer';
import SearchContainer from '..client/containers/SearchContainer';
