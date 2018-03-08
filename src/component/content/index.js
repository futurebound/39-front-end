import React from 'react'
import {connect} from 'react-redux';

import PictureForm from '../picture-form/picture-form';
import * as pictureActions from '../../action/picture-actions';

class Content extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome, authorized user (づ￣ ³￣)づ</h1>
        <h2>Upload a Picture</h2>
        <PictureForm onComplete={this.props.createPicture} />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  createPicture : picture => dispatch(pictureActions.createActionRequest(picture)),
});

export default connect(null,mapDispatchToProps)(Content);
