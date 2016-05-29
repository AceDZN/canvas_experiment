import React,{Component} from 'react';
import { MorphReplace } from 'react-svg-morph';
import IconicDisplay from './IconicDisplay.jsx';

class VideoManipulation extends Component {

  constructor(props){
    super(props);
    this.state = {
      thumb:false,
      timestamp: 0,
      duration:false,
      currentTime:"0:0",
      timePercent:0+"%",
      playback:false,
      muted:false
    }
    this.drawLoader = this.drawLoader.bind(this);
    this.drawThumb = this.drawThumb.bind(this);
    this.downloadImage = this.downloadImage.bind(this);
    this.drawControllers = this.drawControllers.bind(this);
    this.handleVideoPlayback = this.handleVideoPlayback.bind(this);
    this.handleMute = this.handleMute.bind(this)
  }
  componentWillMount(){

  }
  componentDidMount() {
   this.canvas = this.refs.canvas;
   this.video = this.refs.video;
   this.w = this.canvas.clientWidth;
   this.h = this.canvas.clientHeight;
   this.ctx = this.canvas.getContext('2d');
   this.ctx.canvas.width  = this.w;
   this.ctx.canvas.height = this.h;
   this.drawLoader();
   this.drawControllers();
  }

  handleVideoPlayback(){
    if(this.video.paused) {
      this.setState({
        playback:true
      },function(){
        this.video.play()
      }.bind(this));
    }
    else {
      this.setState({
        playback:false
      },function(){
        this.video.pause()
      }.bind(this));
    }
    return false;
  }
  handleMute(){
      this.setState({
        muted: !this.state.muted
      },function(){
        this.video.muted = !this.video.muted;
      }.bind(this));
    return false;
  }

  drawControllers(){
    this.video.addEventListener("loadedmetadata", function() {
      var minutes = Math.floor(this.video.duration / 60);
      var seconds = this.video.duration - minutes * 60;
      var duration = parseInt(minutes)+":"+parseInt(seconds);

      this.setState({
        duration
      });
    }.bind(this));
    this.video.addEventListener("timeupdate", function() {

      var minutes = Math.floor(this.video.currentTime / 60);
      var seconds = this.video.currentTime - minutes * 60;
      var currentTime = parseInt(minutes)+":"+parseInt(seconds);

      var maxduration = this.video.duration;
      var percentage = 100 * this.video.currentTime / maxduration;

      this.setState({
        currentTime,
        timePercent: percentage+'%'
      });
    }.bind(this));
  }
  drawLoader(){
    this.setState({
      thumb:false,
      timestamp:0
    });
    this.ctx.clearRect(0,0,this.w,this.h);
    this.ctx.font = "20px sans-serif";
    this.ctx.fillStyle = "#c0c0c0";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Waiting for interaction...",(this.w/2),(this.h/2));
    this.ctx.strokeStyle = "rgba(225,225,225, 0.20)";
    this.ctx.strokeText("Waiting for interaction...",(this.w/2),(this.h/2));
  }
  drawThumb(){
    this.setState({
      thumb:true,
      timestamp: this.video.currentTime,
    });
    this.ctx.drawImage(this.video,0,0,this.w,this.h);
  }
  downloadImage(){
    var image = this.canvas.toDataURL();
    var aLink = document.createElement('a');
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("click");
    aLink.download = 'thumb_'+this.state.timestamp+'.png';
    aLink.href = image;
    aLink.dispatchEvent(evt);
  }
  render() {
    var timelineStyle = {
      width: this.state.timePercent
    }
   return (
     <div className="page">
       <div className="action-buttons row">
         <div className="col-sm-6 text-left">
           <button type="button" className="btn btn-primary" onClick={this.drawThumb}>Generate Thumbnail</button>
           <button type="button" className="btn btn-danger" onClick={this.drawLoader}>Clear</button>
         </div>
         <div className="col-sm-6 text-right">
           <button type="button" className={' btn btn-success ' + (this.state.thumb?'visible':'hidden')} onClick={this.downloadImage}>Save Screenshot</button>
         </div>
       </div>
       <div className="row">
         <div className="col-xs-12 col-sm-6">
          <video id='v' controls loop width="500" ref="video">
            <source src='./assets/video/video_demo.webm' type='video/webm' />
            <source src='./assets/video/video_demo.ogv' type='video/ogg' />
            <source src='./assets/video/video_demo.mp4' type='video/mp4' />
            <p>Your browser does not support the video tag.</p>

          </video>

          <div className="custom-controls">
            <div className="row">
              <div className="col-xs-1">
                <MorphReplace rotation="none" width={20} height={20} onClick={this.handleVideoPlayback}>
                    {this.state.playback?<IconicDisplay width={20} height={20} key="pause" svg="pause" fill="#00a0e0"  />:<IconicDisplay width={20} height={20} key="play" svg="play" fill="#00a0e0"  />}
                </MorphReplace>
              </div>
              <div className="col-xs-6">
                <div className="progressBar" ref="progressBar">
                  <div className="timeBar" ref="timeBar" style={timelineStyle}></div>
                </div>
              </div>
              <div className="col-xs-2">
                {this.state.currentTime} / {this.state.duration}
              </div>
              <div className="col-xs-2">
                <MorphReplace rotation="none" width={20} height={20} onClick={this.handleMute}>
                    {this.state.muted?<IconicDisplay width={20} height={20} key="mute" svg="mute" fill="#00a0e0"  />:<IconicDisplay width={20} height={20} key="unmute" svg="unmute" fill="#00a0e0"  />}
                </MorphReplace>
                <div className="volumeBar">
                    <div className="volume"></div>
                </div>
              </div>
              <div className="col-xs-1">
                F
              </div>
            </div>



          </div>
        </div>
        <div className="col-xs-12 col-sm-6">
          <canvas ref="canvas" />
        </div>
       </div>
     </div>);
  }
}
class Checked extends React.Component {
    render() {
        return (
            <svg width="24" fill="#00ea00" height="24" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
        );
    }
}
class CheckBox extends React.Component {
    render() {
        return (
            <svg width="24" height="24" fill="#666666" viewBox="0 0 24 24">
                <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
            </svg>
        );
    }
}
export default VideoManipulation
