import React from 'react';
import {Link} from 'react-router-dom';
import {renderIf} from '../../lib/utils';

export default class Navbar extends React.Component {
  render() {
    return(
      <header>
        <nav>
          <ul>
            {renderIf(!this.props.token,
              <React.Fragment>
                <li><Link to='/welcome/signup'>Signup</Link></li>
                <li><Link to='/welcome/signin'>Signin</Link></li>
              </React.Fragment>
            )}
            {renderIf(this.props.token,
              <React.Fragment>
                <li><Link to='/content'>Content</Link></li>
                <li onClick={() => this.props.store.dispatch({type: 'TOKEN_DELETE'})}><Link to='/welcome/signin'>Sign Out</Link></li>
              </React.Fragment>
            )}
          </ul>
        </nav>
      </header>
    );
  };
};