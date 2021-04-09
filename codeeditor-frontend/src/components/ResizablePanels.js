import React,{createRef} from 'react'
class ResizablePanels extends React.Component {
    eventHandler = null
  
    constructor () {
      super()

      this.state = {
        isDragging: false,
        panels: [300, window.innerWidth*0.32, window.innerWidth*0.32]
      }
    }
  
    componentDidMount () {
      const node=this.wrapper.current;
      node.addEventListener('mousemove', this.resizePanel)
      node.addEventListener('mouseup', this.stopResize)
      node.addEventListener('mouseleave', this.stopResize)
    }
    wrapper=createRef();
    startResize = (event, index) => {
      this.setState({
        isDragging: true,
        currentPanel: index,
        initialPos: event.clientX
      })
    }
    
    stopResize = () => {
      if (this.state.isDragging) {
       // console.log(this.state)
        this.setState(({panels, currentPanel, delta}) => ({
          isDragging: false,
          panels: {
            ...panels,
            [currentPanel]: (panels[currentPanel] || 0) - delta,
            [currentPanel - 1]: (panels[currentPanel - 1] || 0) + delta
          },
          delta: 0,
          currentPanel: null
        }))
      }
    }
    
    resizePanel = (event) => {
      if (this.state.isDragging) {
        const delta = event.clientX - this.state.initialPos
        this.setState({
          delta: delta
        })
      }
    }
    
    render() {
      const rest = this.props.children.slice(1)
      return (
        <div ref={this.wrapper} className="panel-container" onMouseUp={() => this.stopResize()}>
          <div className="panel" style={{width: `calc(100% - ${this.state.panels[1]}px - ${this.state.panels[2]}px)`}}>
            {this.props.children[0]}
          </div>
          {[].concat(...rest.map((child, i) => {
            return [
              <div onMouseDown={(e) => this.startResize(e, i + 1)}
                key={"resizer_" + i}
                style={this.state.currentPanel === i+1 ? {left: this.state.delta} : {}}
                className="resizer"></div>,
              <div key={"panel_" + i} className="panel" style={{width: this.state.panels[i + 1]}}>
                {child}
              </div>
            ]
          }))}
        </div>
      )
    }
  }
  export default ResizablePanels

  //https://codepen.io/lopis/pen/XYgRKz