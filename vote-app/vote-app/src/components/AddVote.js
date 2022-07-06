import React, {Component} from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { Snackbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";

export class AddVote extends Component{
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
      
      fetch('https://localhost:44337/api/vote/addvote',{
        method: 'POST',
        headers:{
          'Accept':'application/json',
          'Content-type': 'application/json'
        },
        body:JSON.stringify({
          voter_id : event.target.voter_id.value,
          Party_id : event.target.Party_id.value
          
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
       this.setState({Snackbaropen:true , Snackbarmsg:'Voting Unsuccessful'})
      }
    )}

    render(){
        return(
          <div className="Auth-form-container">

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
          Cast Vote
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
            <Row>
              <Col sm ={6}>
              <Form className="Auth-form" onSubmit={this.handlesubmit}>
                <Form.Group controlId ="vote">
                 <Form.Label>Party_id</Form.Label>
                 <Form.Control
                 type = "number"
                 name= "Party_id"
                 required
                 placeholder="Party_id"
                 />
                 <Form.Label>voter_id</Form.Label>
                 <Form.Control
                 type = "number"
                 name= "voter_id"
                 required
                 placeholder="voter_id"
                 />
                 
                </Form.Group>


                <Form.Group>
                <div className="d-grid gap-2 mt-3">
                  <Button variant ="primary" type="submit">
                    Vote
                  </Button>
                  </div>
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