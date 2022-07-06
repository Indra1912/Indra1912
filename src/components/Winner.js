import React,{Component} from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';



export class Winner extends Component{
  constructor(props){
    super(props);
    this.state = {cans:{}, addModalShow : false};
  }

  componentDidMount(){
    this.refreshList();
  }
  refreshList(){
    fetch('https://localhost:44337/api/candidate/winner')
    .then(response=> response.json())
    .then(data =>{
      this.setState({cans:data});
    }
      );
   }    
    render(){
      const{cans} = this.state;
      let addModalClose =() => this.setState({addModalShow:false});
        return(
          <><h1>The Winning Party is...</h1>
          <h3>{cans.partyname} with {cans.votecount} votes</h3>
                            

            
            </>
       
       
        )
    }
  }
