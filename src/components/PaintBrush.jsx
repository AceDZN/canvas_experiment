import React,{Component} from 'react';

class PaintBrush extends Component {

  constructor(props){
    super(props);
    this.state = {
      drawup: false,
      brushColor: 'black',
      brushSize: '5',
      previewVisible: false
    }
  }
  componentWillMount(){
    this.mouse = {x:0,y:0};
    this.lastMouse={x:0,y:0};
  }
  componentDidMount() {
    this.w = this.canvas.clientWidth;
    this.h = this.canvas.clientHeight;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.canvas.width  = this.w;
    this.ctx.canvas.height = this.h;
  }
  getMousePosition(evt) {
    var rect = this.canvas.getBoundingClientRect();
    var root = document.documentElement;
    return {
      x: evt.clientX - rect.left - root.scrollLeft,
      y: evt.clientY - rect.top - root.scrollTop
    };
  }

  handleMouseMove(e){
    this.lastMouse.x=this.mouse.x;
    this.lastMouse.y=this.mouse.y;
    this.mouse = this.getMousePosition(e);
    this.draw('move');
  }
  handleMouseDown(e){
    this.draw('down');
  }
  handleMouseUp(e){
    this.draw('up');
  }
  draw(a){
    if(a == 'down'){
      this.canvas.style.cursor = "pointer";
      this.canvas && this.setState({
        drawup:true
      });
    }
    if(a == 'up'){
      this.canvas.style.cursor = "default";
      this.canvas && this.setState({
        drawup:false
      });
    }
    if(this.state.drawup){
      this.canvas && this.setState({previewVisible:false});
      this.ctx.beginPath();
        this.ctx.moveTo(this.lastMouse.x,this.lastMouse.y);
        this.ctx.lineTo(this.mouse.x,this.mouse.y);
        this.ctx.strokeStyle = this.state.brushColor;
        this.ctx.lineWidth = this.state.brushSize;
        this.ctx.stroke();
        this.ctx.closePath();
    }
  }
  handleSave(e){

    let dataUrl = this.canvas.toDataURL();
    this.canvas && this.setState({
      dataUrl: dataUrl
    });
    this.canvas && this.setState({previewVisible:true});
  }
  handleClear(e){
    var ok = confirm("Clear it?");
    if (ok){
      this.ctx.clearRect(0,0,this.w,this.h);
      this.canvas && this.setState({previewVisible:false});
    }
  }
  handleColorPicker(e){
    this.canvas && this.setState({
      brushColor: e.target.value
    });
  }
  handleBrushSize(e){
    this.canvas && this.setState({
      brushSize: e.target.value
    });
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
              <input type="color" name="color" className="form-control" id="color" onChange={this.handleColorPicker.bind(this)} />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-addon">
                Brush Size:
              </span>
              <input type="range" min="1" max="20" name="brush" className="form-control" id="brush" onChange={this.handleBrushSize.bind(this)} />
            </div>
          </div>
        </div>
        <div className="col-sm-3 text-right">
          <button type="button" className="btn btn-primary" onClick={this.handleSave.bind(this)}>Save</button>
          <button type="button" className="btn btn-danger" onClick={this.handleClear.bind(this)}>Clear</button>
        </div>
      </div>
      <div>
        <canvas ref={(c) => this.canvas = c}
          onMouseMove={this.handleMouseMove.bind(this)}
          onMouseDown={this.handleMouseDown.bind(this)}
          onMouseUp={this.handleMouseUp.bind(this)}
          onMouseOut={this.handleMouseUp.bind(this)}
          />
      </div>
      <div className={this.state.previewVisible ? "preview-box active" : "preview-box"}>
          <img ref={(img) => this.preview = img} src={this.state.dataUrl} className="" />
      </div>
    </div>
   );
  }



}

export default PaintBrush
