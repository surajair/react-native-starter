import { Database } from './app/database/Database';
import { MIGRATIONS } from './app/database/MIGRATIONS';
import { server } from './mocks/server';

jest.mock('react-native-config');
jest.mock('@react-native-firebase/analytics');
jest.mock('@sentry/react-native');
jest.mock('@react-native-community/async-storage');
jest.mock('react-native-onesignal');
jest.mock('react-native-dotenv');
jest.mock('./app/api/Api');
jest.mock('./app/database/Database');
jest.mock('./app/RootNavigation');

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
  return Database.migrate(MIGRATIONS);
});

// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
