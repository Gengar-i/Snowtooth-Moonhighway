import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App.tsx";
import "./styles/styles";

const client = new ApolloClient({
  uri: "https://snowtooth.moonhighway.com/",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("sm-root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
