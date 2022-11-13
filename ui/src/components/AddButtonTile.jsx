import { Card } from 'flowbite-react';
import React from 'react';

export class AddButtonTile extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <a
        href='#'
      >
        <Card className='bg-gray-200' >
          <div className="flex flex-auto flex-row">
            <div
              className="flex-none relative w-12 h-12 mr-3 rounded-lg bg-gray-400 overflow-hidden"
              style={{ backgroundColor: "bg-gray-800" }}
            >
              <p className='text-5xl align-top text-center'>+</p>
            </div>
            <h2 className='self-center'>
              {this.props.buttonName}
            </h2>
          </div>
        </Card>
      </a>
    );
  }
}