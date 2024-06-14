import { createRootRoute, createRoute } from '@tanstack/react-router';
import { Root } from './components/Root';
import InstallPage from './pages/InstallPage';
import Settings from './pages/Settings';
import Appointments from './pages/Appointments';
import Notes from './pages/Notes';
import Payment from './features/profile/Payment';
import NewContact from './features/contact/NewContact';
import CompanyInfo from './features/profile/CompanyInfo';
import Slots from './features/appointment/Slots';
import QRCodeScanner from './pages/QRCodeScanner';
import CreateAppointment from './features/appointment/CreateAppointment';
import Contacts from './pages/Contacts'; //
import PageNotFound from './components/PageNotFound';
import SearchResults from './components/SearchResults';
import AppointmentInfo from './features/appointment/AppointmentInfo';
import Chat from './pages/ChatPage';
// import Dum from './pages/Dum';
// import ChatPage from './pages/ChatPage';
// import EditContact from './features/contact/EditContact';

const rootRoute = createRootRoute({
  component: Root,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Appointments,
});

const qrRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/qrscanner',
  component: QRCodeScanner,
});
const appointmentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/appointments',
  component: Appointments,
});
const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: Settings,
});
const notesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/notes',
  component: Notes,
});
const installRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/install',
  component: InstallPage,
});
const paymentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payment',
  component: Payment,
});
const newContactsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/newContacts',
  component: NewContact,
});
const companyinfoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/companyinfo',
  component: CompanyInfo,
});
const slotsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/slots',
  component: Slots,
});
const createAppointmentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/createAppointment',
  component: CreateAppointment,
});
const contactsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contacts',
  component: Contacts,
});
const editcontactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/editcontact',
  component: NewContact,
});
const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/search',
  component: SearchResults,
});
const appointmentinfoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/appointmentinfo',
  component: AppointmentInfo,
});
const chatpageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/chatpage',
  component: Chat,
});
const pageNotFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/*',
  component: PageNotFound,
});


export const routeTree = rootRoute.addChildren([
  indexRoute,
  qrRoute,
  appointmentsRoute,
  settingsRoute,
  notesRoute,
  installRoute,
  paymentRoute,
  newContactsRoute,
  companyinfoRoute,
  slotsRoute,
  createAppointmentRoute,
  contactsRoute,
  editcontactRoute,
  searchRoute,
  appointmentinfoRoute,
  chatpageRoute,
  pageNotFoundRoute,
]);
