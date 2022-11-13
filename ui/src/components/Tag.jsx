import Urbit from '@urbit/http-api';
import { Badge } from 'flowbite-react';
import React from 'react';

export class Tag extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Badge >
        <p>{this.props.name}</p>
      </Badge>
    );
  }
}