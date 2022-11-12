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
      <Card href="#" className="w-full">
        <div className="flex flex-row justify-between">
          <div className='flex flex-row'>
            <div
            className="flex-none relative w-12 h-12 mr-3 rounded-lg bg-gray-200 overflow-hidden"
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
            <h3>
              {this.props.title}
            </h3>
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
      </Card>
    );
  };
}