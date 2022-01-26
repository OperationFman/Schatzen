import React, { useState } from "react";
import { AlertController } from "./Alert/AlertController";
import { PlayHomeButton } from "./Components/Buttons/PlayHomeButton";
import { SpectatorButton } from "./Components/Buttons/SpectatorHomeButton";

function App() {
  return (
    <div className="App">
      <SpectatorButton />
      <PlayHomeButton />
      <AlertController />
    </div>
  );
}

export default App;