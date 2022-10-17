import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import MainPage from "./pages/MainPage/MainPage";
import BudgetPage from "./pages/BudgetPage/BudgetPage";
import BudgetDailyView from "./pages/BudgetPage/BudgetDailyView";
import NotePage from './pages/NotePage/NotePage';
import AllLists from "./pages/ShowAll/AllLists";
import AllBudgets from "./pages/ShowAll/AllBudgets";
setupIonicReact();

const App: React.FC = () => (
 <IonApp>
  <IonReactRouter>
   <IonRouterOutlet>
    <Route exact path="/home">
     <MainPage />
    </Route>
    <Route exact path="/Budget/:budgetId">
     <BudgetPage />
    </Route>
    <Route exact path="/DailyBudget/:budgetId/:date">
     <BudgetDailyView />
    </Route>
    <Route exact path="/Note/:listName/:noteId">
      <NotePage />
    </Route>
    <Route exact path="/AllLists">
      <AllLists />
    </Route>
    <Route exact path="/AllBudgets">
      <AllBudgets />
    </Route>
    <Route exact path="/">
     <Redirect to="/home" />
    </Route>
    <Route exact path="/Budgets">
     {/* <Budgets /> */}
    </Route>
   </IonRouterOutlet>
  </IonReactRouter>
 </IonApp>
);

export default App;
