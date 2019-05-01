import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";

import App from "./containers/App";

const rootDOMElement = document.getElementById("app");

// tslint:disable-next-line:variable-name
const render = (AppComponent: any) => {
  ReactDOM.render(
      <AppContainer >
        <AppComponent />
      </AppContainer >,
    rootDOMElement,
  );
};

render(App);

if ((module as any).hot) {
  (module as any).hot.accept("./containers/App", () => {
    // tslint:disable-next-line:variable-name
    const NextApp = require("./containers/App").default; // tslint:disable-line no-var-requires
    render(NextApp);
  });
}
