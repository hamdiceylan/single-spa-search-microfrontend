import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import SearchPage from "./search-page/search-page.component.js";

export default function Root() {
  return (
    <BrowserRouter>
      <Route path="/search" component={SearchPage} exact />
    </BrowserRouter>
  );
}
