import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Debug, NotFound, Verify } from "./screens";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/debug" exact component={Debug} />
        <Route path="/verify" exact component={Verify} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
