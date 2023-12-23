import React from 'react'

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: {
        "nodes": [
          {
            "id": "node-1",
            "label": "Node 1",
            "x": 100,
            "y": 100
          },
          {
            "id": "node-2",
            "label": "Node 2",
            "x": 300,
            "y": 100
          }
        ],
        "edges": [
          {
            "id": "edge-1",
            "label": "Edge 1",
            "source": "node-1",
            "target": "node-2"
          }
        ]
      }
    }
  }

  render(){
    return(
      <div>
        <h1>Home page </h1>
      </div>
    )
  }
}
export default Home;