import React, { useState } from "react";
import { FormDiv } from "./Form";
import { User } from "../utils/typings";
import { List } from "./List";

function App() {
  const [responseUsers, setResponseUsers] = useState<
    User[]
  >([]);
  return (
    <div className="App">
      <FormDiv setResponseUsers={setResponseUsers} />
      <List responseUsers={responseUsers} />
    </div>
  );
}

export default App;
