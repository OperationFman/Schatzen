import React from "react";
import { PlayHomeButton } from "./Components/PlayHomeButton";
import { SpectatorButton } from "./Components/SpectatorHomeButton";

function App() {
  return (
    <div className="App">
      <SpectatorButton />
      <PlayHomeButton />
    </div>
  );
}

export default App;

// FOR PLAYERS

// WHEN POLLING:
// Check user name in storage still exists, if not throw them back to main menu
// Check user score, if 0, allow to enter a new score (Confirm button appears)

// WHEN SENDING
// Hit confirm, confirm to disappear and loading icon to appear on card, this can happen by temporarily setting this users score state to -1 idk
// When polling goes off as normal, it will have a score with the name, this should trigger which card to be 'locked in'

// For Concurrency
// Attempt to update server, poll the server, if data doesnt appear, attempt to update with this newly pulled data 5 times, then throw error if still not appearing
// This will happen if someone elses push overrides yours
