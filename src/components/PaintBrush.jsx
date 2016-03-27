import React,{Component} from 'react';

class PaintBrush extends Component {

  constructor(props){
    super(props);
    this.state = {
      renderedImg:""
    }
  }
  componentWillMount(){

  }
  componentDidMount() {
   this.w = this.canvas.clientWidth;
   this.h = this.canvas.clientHeight;
   this.ctx = this.canvas.getContext('2d');
   this.ctx.canvas.width  = this.w;
   this.ctx.canvas.height = this.h;


  }

  draw(){

  }
  handleSave(){

  }
  handleClear(){

  }
  handleColorPicker(){

  }
  render() {
   return (
    <div className="page">
      <div className="action-buttons row">
        <div className="col-sm-9 text-left form-inline">
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-addon btn">
                <label htmlFor="color">Select Color</label>
              </span>
              <input type="color" name="color" className="form-control" id="color" onChange={this.handleColorPicker} />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-addon">
                Brush Size:
              </span>
              <input type="range" min="1" max="20" name="brush" className="form-control" id="color" onChange={this.handleBrushSize} />
            </div>
          </div>
        </div>
        <div className="col-sm-3 text-right">
          <button type="button" className="btn btn-primary" onClick={this.handleSave}>Save</button>
          <button type="button" className="btn btn-danger" onClick={this.handleClear}>Clear</button>
        </div>
      </div>
      <div>
        <canvas ref={(c) => this.canvas = c} />
      </div>
      <img ref={(img) => this.preview = img} className="" />
    </div>
   );
  }



}

export default PaintBrush
