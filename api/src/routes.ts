import { Route } from './types';

import { requestLogger } from './middleware/requestLogger';

import { health } from './controllers/health';
import {
  beginSync,
  getSyncStatus,
  getSyncedUsers
} from './controllers/v1/users';

export const routes: Route[] = [
  {
    method: 'get',
    path: '/health',
    middleware: [],
    controller: health,
  },
  // User Sync Routes
  {
    method: 'post',
    path: '/v1/users',
    middleware: [requestLogger],
    controller: beginSync,
  },
  {
    method: 'get',
    path: '/v1/users/sync',
    middleware: [requestLogger],
    controller: getSyncStatus,
  },
  {
    method: 'get',
    path: '/v1/users',
    middleware: [requestLogger],
    controller: getSyncedUsers,
  },
];
