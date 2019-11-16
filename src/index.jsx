import React from 'react';
import ReactDom from 'react-dom';

const App = () => {
  return (
    <div className="reactTest">
      React Test
    </div>
  );
}

ReactDom.render(<App/>, document.getElementById('app'));