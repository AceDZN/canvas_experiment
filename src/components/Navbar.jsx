import React, {Component} from 'react';
import Link from 'react-router/lib/Link'

class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      navbarCollapse: 'out',
      active: this.props.current
    }
  }
  handleNavbarCollapse(){
    if(this.state.navbarCollapse == "in"){
      this.setState({navbarCollapse: "out"});
    } else {
      this.setState({navbarCollapse: "in"});
    }
  }
  render(){

    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="container">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed"onClick={this.handleNavbarCollapse.bind(this)}>
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#">HTML5 Canvas experiments</a>
              </div>

              <div className={"collapse navbar-collapse "+this.state.navbarCollapse}>
                <ul className="nav navbar-nav">
                  <li className={this.props.current == '/bouncingBall' ? "active" : ""}>
                    <Link to="bouncingBall">
                      Bouncing Ball
                      <span className="sr-only">{this.props.current == '/bouncingBall' ? "(current)" : ""}</span>
                    </Link>
                  </li>
                  <li className={this.props.current == '/paintBrush' ? "active" : ""}>
                    <Link to="paintBrush">
                      Paint Brush
                      <span className="sr-only">{this.props.current == '/paintBrush' ? "(current)" : ""}</span>
                    </Link>
                  </li>
                  <li className={this.props.current == '/breakOut' ? "active" : ""}>
                    <Link to="breakOut">
                      BreakOut
                      <span className="sr-only">{this.props.current == '/breakOut' ? "(current)" : ""}</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default Navbar
