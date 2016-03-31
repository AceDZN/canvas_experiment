import React,{Component} from 'react';

class StatusBar extends Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  render(){
    return(
       <div className="action-buttons row">
         <div className="col-sm-12 text-left form-inline">
           
           <div className="form-group hidden-xs hidden-sm">
             <div className="input-group">
               <span className="input-group-addon btn">
                 <label htmlFor="ball_color">Ball:</label>
               </span>
               <input type="color" value={this.props.ballColor} name="ball_color" className="form-control" id="ball_color" onChange={this.props.changeBallColor} />
             </div>
           </div>


           <div className="form-group hidden-xs hidden-sm">
             <div className="input-group">
               <span className="input-group-addon btn">
                 <label htmlFor="paddle_color">Paddle:</label>
               </span>
               <input type="color" value={this.props.paddleColor} name="paddle_color" className="form-control" id="paddle_color" onChange={this.props.changePaddleColor} />
             </div>
           </div>
           <div className="form-group hidden-xs hidden-sm">
             <div className="input-group">
               <span className="input-group-addon btn">
                 <label htmlFor="bg_color">Background:</label>
               </span>
               <input type="color" name="color" value={this.state.bgColor} className="form-control" id="bg_color" onChange={this.props.changeBGColor} />
             </div>
           </div>
           <div className="form-group hidden-xs hidden-sm">
             <div className="input-group">
               <span className="input-group-addon btn">
                 <label htmlFor="brick_color">Bricks:</label>
               </span>
               <input type="color" value={this.props.brickColor} name="brick_color" className="form-control" id="brick_color" onChange={this.props.changeBricksColor} />
             </div>
           </div>
           <div className="form-group hidden-xs hidden-sm">
             <div className="input-group">
               <span className="input-group-addon">
                 Ball Size:
               </span>
               <input type="range" min="1" max="20" name="ball_size" className="form-control" id="ball_size" onChange={this.props.changeBallSize} />
             </div>
           </div>
           <div className="form-group hidden-xs hidden-sm">
             <input type="number" value={this.props.lives} onChange={this.props.changeLives}  className="lives_input hidden-xs hidden-sm"/>
           </div>
           <div className="form-group pull-right icon_wrap crown">
             <img src="./assets/img/crown.svg" className="pull-right"/>
             <h5 className="pull-left">{this.props.highscore}</h5>
           </div>
           <div className="form-group pull-right icon_wrap star">
             <img src="./assets/img/star.svg" className="pull-right"/>
             <h5 className="pull-left">{this.props.score}</h5>
           </div>

           <div className="form-group pull-right icon_wrap ball">
             <img src="./assets/img/ball.svg" className="pull-right"/>
             <h5 className="pull-left">{this.props.lives}</h5>
           </div>

         </div>
       </div>
   );
  }
}

export default StatusBar
