import React from 'react';
import SupportAgent from './components/SupportAgent';
import SupportTicket from './components/SupportTicket';



function App() {
  return (
    <div className="App">
      <h1 className="max-w-md mx-auto mt-8 ">Support Agent Creation Screen</h1>
      <SupportAgent />

      <h1 className="max-w-md mx-auto mt-8">Support Ticket Entry Screen</h1>
      <SupportTicket />
    </div>

  );
}

export default App
