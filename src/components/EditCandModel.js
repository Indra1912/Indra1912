import React, {Component} from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { Snackbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";

export class EditCandModel extends Component{
    constructor(props){
        super(props);

         this.state = {Snackbaropen: false, Snackbarmsg: ''}
        this.handlesubmit = this.handlesubmit.bind(this);
    }
    SnackbarClose = (event)=>{
        this.setState({Snackbaropen:false});
    }
    handlesubmit(event){
        event.preventDefault();
        
        fetch('https://localhost:44337/api/admin/editcandidate',{
          method: 'PUT',
          headers:{
            'Accept':'application/json',
            'Content-type': 'application/json'
          },
          body:JSON.stringify({
            Party_id : event.target.Party_id.value,
            partyname: event.target.partyname.value,          
            candidatename: event.target.candidatename.value,
            votecount: null
          })
        })
        .then(res=> res.json())
        .then((result)=>
        {
         // alert(result);
         this.setState({Snackbaropen:true , Snackbarmsg:result})
        },
        (error)=>
        {
         // alert('Insertion Failed');
         this.setState({Snackbaropen:true , Snackbarmsg:'Update Failed'})
        }
      )}
      render(){
        return(
          <div className="container">

           <Snackbar anchorOrigin={{vertical:'center', horizontal:'center'}}
           open = {this.state.Snackbaropen}
           autoHideDuration = {3000}
           onClose ={this.SnackbarClose}

           message = {<span id = "message-id">{this.state.Snackbarmsg}</span>}
           action={[
                <IconButton 
                key = "close"
                arail-label = "close"
                color="inherit"
                onClick={this.SnackbarClose}
                >
                  x
                </IconButton>
                
           ]}
            />


            <Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Candidate
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
            <Row>
              <Col sm ={6}>
              <Form onSubmit={this.handlesubmit}>
                <Form.Group controlId ="candidate">
                 
                 <Form.Label>Party_id</Form.Label>
                 <Form.Control
                 type = "number"
                 name= "Party_id"
                 required
                 disabled
                 defaultValue={this.props.canid}
                 placeholder="Party_id"
                 />
                 <Form.Label>partyname</Form.Label>
                 <Form.Control
                 type = "text"
                 name= "partyname"
                 required
                 defaultValue={this.props.canpar}
                 placeholder="partyname"
                 />
                </Form.Group>
                <Form.Label>candidatename</Form.Label>
                 <Form.Control
                 type = "text"
                 name= "candidatename"
                 required
                 defaultValue={this.props.canname}
                 placeholder="candidatename"
                 />


                <Form.Group>
                  <Button variant ="primary" type="submit">
                   Update Candidate
                  </Button>
                </Form.Group>
              </Form>
              </Col>  
            </Row>
        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    </div>
        );
    }
  
}