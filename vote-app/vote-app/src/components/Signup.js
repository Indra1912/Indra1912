import React, {Component} from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { Snackbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";

export class Signup extends Component{
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
      
      fetch('https://localhost:44337/api/voter/register',{
        method: 'POST',
        headers:{
          'Accept':'application/json',
          'Content-type': 'application/json'
        },
        body:JSON.stringify({
          voter_id : event.target.voter_id.value,
          name: event.target.name.value,          
          mobile: event.target.mobile.value,
          address: event.target.address.value,
         birthdate: event.target.birthdate.value,
          password: event.target.password.value
          
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
       this.setState({Snackbaropen:true , Snackbarmsg:'Insertion Failed'})
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
          Add Voter
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
            <Row>
              <Col sm ={6}>
              <Form onSubmit={this.handlesubmit}>
                <Form.Group controlId ="voter">
                 <Form.Label>name</Form.Label>
                 <Form.Control
                 type = "text"
                 name= "name"
                 required
                 placeholder="name"
                 />
                 <Form.Label>voter_id</Form.Label>
                 <Form.Control
                 type = "number"
                 name= "voter_id"
                 required
                 placeholder="voter_id"
                 />
                 <Form.Label>mobile</Form.Label>
                 <Form.Control
                 type = "text"
                 name= "mobile"
                 required
                 placeholder="mobile"
                 />
                 <Form.Label>birthdate</Form.Label>
                 <Form.Control
                 type = "text"
                 name= "birthdate"
                 required
                 placeholder="birthdate"
                 />
                 <Form.Label>address</Form.Label>
                 <Form.Control
                 type = "text"
                 name= "address"
                 required
                 placeholder="address"
                 />
                 <Form.Label>password</Form.Label>
                 <Form.Control
                 type = "text"
                 name= "password"
                 required
                 placeholder="password"
                 />
                </Form.Group>


                <Form.Group>
                <div className="d-grid gap-2 mt-3">
                  <Button variant ="primary" type="submit">
                    Add Voter
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