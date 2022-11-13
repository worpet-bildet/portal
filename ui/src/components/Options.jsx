import React from 'react';

export class Options extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <svg className="w-6 h-6 hover:bg-gray-400 rounded" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
      </div>
    );
  }
}