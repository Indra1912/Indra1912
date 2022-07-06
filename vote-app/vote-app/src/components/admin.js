import React,{Component} from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddCandModel } from './AddCandModel';
import {EditCandModel} from './EditCandModel';
import {AdminVoter} from './adminvoter'
import { Winner } from './Winner';

export class Admin extends Component{
  constructor(props){
    super(props);
    this.state = {cans:[], addModalShow : false, editModalShow: false};
    
  }

  componentDidMount(){
    this.refreshList();
  }
  refreshList(){
    fetch('https://localhost:44337/api/candidate/getallcandidates')
    .then(response=> response.json())
    .then(data =>{
      this.setState({cans:data});
    }
      );
   } 
   componentDidUpdate(){
             this.refreshList();
   }   

   deleteCand(canid)
   {
    if(window.confirm('Are You Sure You Want To Delete This Candidate?'))
    {
      fetch('https://localhost:44337/api/admin/cdel/'+canid,{
        method: 'DELETE',
        header:{
          'Accept':'application/json',
            'Content-type': 'application/json'
        }
      })
    }
   }

    render(){
      const{cans,canid,canpar,canname} = this.state;
      let addModalClose =() => this.setState({addModalShow:false});
      let editModalClose =() => this.setState({editModalShow:false});
        return(
          <><h1>Candidate Details</h1>
          <Table className='mt-4' striped bordered hover size='small'>
            <thead>
              <th>PartyID</th>
              <th>Partyname</th>
              <th>CandidateName</th>
              <th>Option</th>
            </thead>
            <tbody>
              {cans.map(can => <tr key={can.Party_id}>
                <td> {can.Party_id}</td>
                <td> {can.partyname}</td>
                <td>{can.candidatename}</td>
                <td>
                  <ButtonToolbar>
                    <Button
                    className="mr-2" variant="info"
                    onClick = {()=> this.setState({editModalShow:true, canid:can.Party_id,canname:can.candidatename,canpar:can.partyname})}>
                     Edit
                    </Button>
                    <EditCandModel
                    show = {this.state.editModalShow}
                    onHide= {editModalClose}
                    canid = {canid}
                    canpar = {canpar}
                    canname=  {canname}
                    />                   
                  </ButtonToolbar>
                </td>
                <td>
                  <ButtonToolbar>
                    <Button
                    className="mr-2" variant="danger"
                    onClick = {()=> this.deleteCand(can.Party_id)}>
                     Delete
                    </Button>
                    <EditCandModel
                    show = {this.state.editModalShow}
                    onHide= {editModalClose}
                    canid = {canid}
                    canpar = {canpar}
                    canname=  {canname}
                    />                   
                  </ButtonToolbar>
                </td>
              </tr>
              )}
            </tbody>
          </Table><ButtonToolbar>
              <Button variant="primary"
                onClick={() => this.setState({ addModalShow: true })}
              > Add Candidate
              </Button>
            </ButtonToolbar>
            <AddCandModel
              show = {this.state.addModalShow}
                onHide = {addModalClose}>
            </AddCandModel>

             <Winner></Winner>
            <AdminVoter></AdminVoter>
            
            </>
       
       
        )
    }
  }
