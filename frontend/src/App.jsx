import React from 'react';
import SupportAgent from './components/SupportAgent';
import SupportTicket from './components/SupportTicket';



function App() {
  return (

    <div className="App">
      <div className="flex items-center justify-center">
        <h1 className="mr-10 text-3xl mt-4 font-bold">Support Ticket Entry System</h1>
      </div>

      <h1 className="max-w-md mx-auto mt-8 font-bold">Support Agent Creation Screen</h1>
      <SupportAgent />

      <h1 className="max-w-md mx-auto mt-8 font-bold">Support Ticket Entry Screen</h1>
      <SupportTicket />
    </div>

  );
}

export default App
