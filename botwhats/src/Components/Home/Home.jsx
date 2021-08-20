import React from "react";
import { bot } from "../../Bot";
import Style from "./Home.module.scss";

export const Home /* : React.FunctionComponent<{}> */ = () => {
  bot();
  return <div id={Style.container}>Home</div>;
};
