import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import HomePage from './components/HomePage';
import CityPage from './components/CityPage';

import './App.css';
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="weather-app">
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/:coord">
            <CityPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
