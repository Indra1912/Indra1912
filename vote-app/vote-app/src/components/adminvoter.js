import React,{Component} from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';

import { AddVoteModel } from './AddVoteModel';
import {EditVoteModel} from './EditVoteModel';

export class AdminVoter extends Component{
  constructor(props){
    super(props);
    this.state = {vots:[], addModalShow : false, editModalShow: false};
    
  }

  componentDidMount(){
    this.refreshList();
  }
  refreshList(){
    fetch('https://localhost:44337/api/admin/getallvoters')
    .then(response=> response.json())
    .then(data =>{
      this.setState({vots:data});
    }
      );
   } 
   componentDidUpdate(){
             this.refreshList();
   }   

   deleteVot(votid)
   {
    if(window.confirm('Are You Sure You Want To Delete This Voter?'))
    {
      fetch('https://localhost:44337/api/admin/vdel/'+votid,{
        method: 'DELETE',
        header:{
          'Accept':'application/json',
            'Content-type': 'application/json'
        }
      })
    }
   }

    render(){
      const{vots,votid,votname,votdob,votadd,votpass,votmob} = this.state;
      let addModalClose =() => this.setState({addModalShow:false});
      let editModalClose =() => this.setState({editModalShow:false});
        return(
          <><h1>Voter Details</h1>
          <Table className='mt-4' striped bordered hover size='small'>
            <thead>
              <th>VoterID</th>
              <th>Name</th>
              <th>DOB</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Option</th>
              <th>Option</th>
            </thead>
            <tbody>
              {vots.map(vot => <tr key={vot.voter_id}>
                <td> {vot.voter_id}</td>
                <td> {vot.name}</td>
                <td>{vot.birthdate}</td>
                <td>{vot.mobile}</td>
                <td>{vot.address}</td>
                <td>
                  <ButtonToolbar>
                    <Button
                    className="mr-2" variant="info"
                    onClick = {()=> this.setState({editModalShow:true, votid:vot.voter_id,votname:vot.name,votdob:vot.birthdate,votmob:vot.mobile,votadd:vot.address,votpass:vot.password})}>
                     Edit
                    </Button>
                    <EditVoteModel
                    show = {this.state.editModalShow}
                    onHide= {editModalClose}
                    votid = {votid}
                    votname = {votname}
                    votdob = {votdob}
                    votmob = {votmob}
                    votadd = {votadd}
                    votpass = {votpass}
                    />                   
                  </ButtonToolbar>
                </td>
                <td>
                  <ButtonToolbar>
                    <Button
                    className="mr-2" variant="danger"
                    onClick = {()=> this.deleteVot(vot.voter_id)}>
                     Delete
                    </Button>
                    <EditVoteModel
                    show = {this.state.editModalShow}
                    onHide= {editModalClose}
                    votid = {votid}
                    votname = {votname}
                    votdob = {votdob}
                    votmob = {votmob}
                    votadd = {votadd}
                    votpass = {votpass}
                    />                     
                  </ButtonToolbar>
                </td>
              </tr>
              )}
            </tbody>
          </Table><ButtonToolbar>
              <Button variant="primary"
                onClick={() => this.setState({ addModalShow: true })}
              > Add Voter
              </Button>
            </ButtonToolbar>
            <AddVoteModel
              show = {this.state.addModalShow}
                onHide = {addModalClose}>
            </AddVoteModel>


            
            
            </>
       
       
        )
    }
  }
