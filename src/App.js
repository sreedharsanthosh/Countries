import "./App.css";
import Home from "./Home";
import Country from "./Country";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/:countryNumber" exact component={Country} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
