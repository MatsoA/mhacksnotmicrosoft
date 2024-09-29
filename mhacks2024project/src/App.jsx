import React, { useState } from 'react';
import { Box, Button, Typography, Paper, Snackbar } from '@mui/material';

class Word {
  constructor(text, combinable) {
    this.text = text;
    this.combinable = combinable;
  }
}

const wordList = [
  new Word('Sword', true),
  new Word('Armor', true),
  new Word('Shield', true),
  new Word('Strength Potion', false),
  new Word('Endurance Potion', false),
  new Word('20/20 vision', true),
  new Word('super speed', true),
];

const MyApp = () => {
  const [playerA, setPlayerA] = useState([]);
  const [wordBank, setWordBank] = useState(wordList);
  const [selectedWords, setSelectedWords] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleWordClick = (word) => {
    setPlayerA((prev) => [...prev, word]);
    setWordBank((prev) => prev.filter((w) => w !== word));
  };

  const handlePlayerAClick = (word) => {
    // Prevent selecting the same word twice
    if (selectedWords.includes(word)) {
      return;
    }
  
    setSelectedWords((prev) => {
      const updatedSelection = [...prev, word];
      if (updatedSelection.length === 2) {
        if (updatedSelection[0].combinable && updatedSelection[1].combinable) {
          const combinedWord = `${updatedSelection[0].text} ${updatedSelection[1].text}`;
          setSelectedWords([]);
          setPlayerA((prev) => 
            prev.filter(w => !updatedSelection.includes(w)).concat(new Word(combinedWord, true))
          );
        } else {
          setErrorMessage('One or both of the selected words cannot be combined.');
          setOpenSnackbar(true);
          setSelectedWords([]);
        }
      }
      return updatedSelection.length < 2 ? updatedSelection : [];
    });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Word Bank Section */}
      <Box sx={{ width: '50%', padding: 2, borderRight: '1px solid #ccc', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6">Word Bank:</Typography>
        <Paper sx={{ padding: 1, flexGrow: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {wordBank.length > 0 ? (
            wordBank.map((word) => (
              <Button
                key={word.text}
                variant="outlined"
                onClick={() => handleWordClick(word)}
                sx={{ margin: 1 }}
              >
                {word.text}
              </Button>
            ))
          ) : (
            <Typography>No words left!</Typography>
          )}
        </Paper>
      </Box>

      {/* Player A Section */}
      <Box sx={{ width: '50%', padding: 2 }}>
        <Typography variant="h6">Player A:</Typography>
        <Paper sx={{ padding: 1, minHeight: '100px', cursor: 'pointer' }}>
          {playerA.length > 0 ? (
            playerA.map((word) => (
              <Button
                key={word.text}
                variant="outlined"
                onClick={() => handlePlayerAClick(word)}
                sx={{ margin: 1 }}
              >
                {word.text}
              </Button>
            ))
          ) : (
            <Typography>No words selected!</Typography>
          )}
        </Paper>
      </Box>

      {/* Snackbar for error messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={errorMessage}
      />
    </Box>
  );
};

export default MyApp;

// import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   useEffect(() => {
//     const webSocket = new WebSocket((window.location.protocol == "http:" ? "ws://" : "wss://") + window.location.host + "/ws");
//     webSocket.addEventListener("message", (e) => console.log(e));
//     webSocket.addEventListener("open", () => webSocket.send("MEOWIING"));
//   }, []) 
  

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
