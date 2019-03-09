import Buttons from 'views/components/Buttons.jsx'
import Calendar from 'views/Calendar.jsx'
import Charts from 'views/Charts.jsx'
import Dashboard from 'views/Dashboard.jsx'
import ExtendedForms from 'views/forms/ExtendedForms.jsx'
import ExtendedTables from 'views/tables/ExtendedTables.jsx'
import GridSystem from 'views/components/GridSystem.jsx'
import Icons from 'views/components/Icons.jsx'
import Notifications from 'views/components/Notifications.jsx'
import Panels from 'views/components/Panels.jsx'
import ReactTables from 'views/tables/ReactTables.jsx'
import RegularForms from 'views/forms/RegularForms.jsx'
import RegularTables from 'views/tables/RegularTables.jsx'
import SweetAlert from 'views/components/SweetAlert.jsx'
import Timeline from 'views/pages/Timeline.jsx'
import Typography from 'views/components/Typography.jsx'
import UserProfile from 'views/pages/UserProfile.jsx'
import ValidationForms from 'views/forms/ValidationForms.jsx'
import Wizard from 'views/forms/Wizard.jsx'
import Trainings from 'views/Trainings/TrainingsPage/TrainingsPage.jsx'
import SingleTrainingPage from 'views/Trainings/SingleTrainingPage/SingleTrainingPage.jsx'
import TrainingsNew from 'views/Trainings/TrainingsNew/TrainingsNew.jsx'
import TeamsPage from 'views/Teams/TeamsPage.jsx'

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'nc-icon nc-bank',
    component: Dashboard,
    layout: '/app',
    hidden: true,
  },
  {
    path: '/trainings/new',
    name: 'Trainings',
    icon: 'nc-icon nc-layout-11',
    component: TrainingsNew,
    layout: '/app',
    hidden: true,
  },
  {
    path: '/trainings/single/:id',
    name: 'Edit Training',
    component: SingleTrainingPage,
    layout: '/app',
    hidden: true,
  },
  {
    path: '/trainings',
    name: 'Trainings',
    icon: 'nc-icon nc-user-run',
    component: Trainings,
    layout: '/app',
  },
  {
    path: '/teams',
    name: 'Teams',
    icon: 'nc-icon nc-tile-56',
    component: TeamsPage,
    layout: '/app',
  },
  {
    hidden: true,
    path: '/user-profile',
    name: 'UserProfile',
    component: UserProfile,
    layout: '/app',
  },
  {
    path: '/timeline',
    name: 'Timeline',
    icon: 'nc-icon nc-book-bookmark',
    component: Timeline,
    layout: '/app',
  },
  {
    collapse: true,
    name: 'Components',
    icon: 'nc-icon nc-layout-11',
    state: 'componentsCollapse',
    views: [
      {
        path: '/buttons',
        name: 'Buttons',
        mini: 'B',
        component: Buttons,
        layout: '/app',
      },
      {
        path: '/grid-system',
        name: 'Grid System',
        mini: 'GS',
        component: GridSystem,
        layout: '/app',
      },
      {
        path: '/panels',
        name: 'Panels',
        mini: 'P',
        component: Panels,
        layout: '/app',
      },
      {
        path: '/sweet-alert',
        name: 'Sweet Alert',
        mini: 'SA',
        component: SweetAlert,
        layout: '/app',
      },
      {
        path: '/notifications',
        name: 'Notifications',
        mini: 'N',
        component: Notifications,
        layout: '/app',
      },
      {
        path: '/icons',
        name: 'Icons',
        mini: 'I',
        component: Icons,
        layout: '/app',
      },
      {
        path: '/typography',
        name: 'Typography',
        mini: 'T',
        component: Typography,
        layout: '/app',
      },
    ],
  },
  {
    collapse: true,
    name: 'Forms',
    icon: 'nc-icon nc-ruler-pencil',
    state: 'formsCollapse',
    hidden: true,
    views: [
      {
        path: '/regular-forms',
        name: 'Regular Forms',
        mini: 'RF',
        component: RegularForms,
        layout: '/app',
      },
      {
        path: '/extended-forms',
        name: 'Extended Forms',
        mini: 'EF',
        component: ExtendedForms,
        layout: '/app',
      },
      {
        path: '/validation-forms',
        name: 'Validation Forms',
        mini: 'VF',
        component: ValidationForms,
        layout: '/app',
      },
      {
        path: '/wizard',
        name: 'Wizard',
        mini: 'W',
        component: Wizard,
        layout: '/app',
      },
    ],
  },
  {
    collapse: true,
    name: 'Tables',
    icon: 'nc-icon nc-single-copy-04',
    state: 'tablesCollapse',
    hidden: true,
    views: [
      {
        path: '/regular-tables',
        name: 'Regular Tables',
        mini: 'RT',
        component: RegularTables,
        layout: '/app',
      },
      {
        path: '/extended-tables',
        name: 'Extended Tables',
        mini: 'ET',
        component: ExtendedTables,
        layout: '/app',
      },
      {
        path: '/react-tables',
        name: 'React Tables',
        mini: 'RT',
        component: ReactTables,
        layout: '/app',
      },
    ],
  },
  {
    path: '/charts',
    name: 'Charts',
    icon: 'nc-icon nc-chart-bar-32',
    component: Charts,
    layout: '/app',
    hidden: true,
  },
  {
    path: '/calendar',
    name: 'Calendar',
    icon: 'nc-icon nc-calendar-60',
    component: Calendar,
    layout: '/app',
  },
]

export default routes
