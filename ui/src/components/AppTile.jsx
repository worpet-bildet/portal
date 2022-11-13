import { Card } from 'flowbite-react';
import React from 'react';
import { Options } from './Options';
import { Tag } from './Tag';

function normalizeUrbitColor(color) {
  if (color.startsWith('#')) {
    return color;
  }
  return `#${color.slice(2).replace('.', '').toUpperCase()}`;
}

export class AppTile extends React.Component {
  constructor(props) {
    super(props)
    this.state = { imageError: false };
  }

  render() {
    return (
      <div className="w-full p-4 rounded border border-black hover:bg-gray-200">
        <div className="flex flex-row flex-auto justify-between">
          <div className='flex flex-row'>
            <div
            className="flex-none relative w-20 h-20 mr-10 rounded-lg bg-gray-200 overflow-hidden"
            style={{ backgroundColor: normalizeUrbitColor(this.props.color) }}
            >
            <img
              className="h-full w-full object-cover"
              src={this.props.image}
              alt=""
              onError={() => setImageError(true)}
            />
            </div>
            <div className='flex flex-col space-y-3'>
              <p className='text-2xl font-bold'>
                {this.props.title}
              </p>
              {
                this.props.keywords && <ul className="flex flex-wrap gap-2">
                  {this.props.keywords.map((tag, i) => <li key={`${this.props.title}_${tag}_${i}`}>
                    <Tag name={tag}/>
                  </li>)}
                </ul>
              }
            </div>
          </div>
          <Options />
        </div>
      </div>
    );
  };
}