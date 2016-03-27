import React, {Component} from 'react';
import Navbar from './Navbar.jsx';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render(){
    return (
      <div>
        <Navbar current={this.props.location.pathname} />
        <div className="container">
          <div className="row">
            <div className="col-xs-12 text-center">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
