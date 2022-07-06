import React, {Component} from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { Snackbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";

export class AddCandModel extends Component{
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
      
      fetch('https://localhost:44337/api/admin/addcandidate',{
        method: 'POST',
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
          Add Candidate
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
            <Row>
              <Col sm ={6}>
              <Form onSubmit={this.handlesubmit}>
                <Form.Group controlId ="candidate">
                 <Form.Label>candidatename</Form.Label>
                 <Form.Control
                 type = "text"
                 name= "candidatename"
                 required
                 placeholder="candidatename"
                 />
                 <Form.Label>Party_id</Form.Label>
                 <Form.Control
                 type = "number"
                 name= "Party_id"
                 required
                 placeholder="Party_id"
                 />
                 <Form.Label>partyname</Form.Label>
                 <Form.Control
                 type = "text"
                 name= "partyname"
                 required
                 placeholder="partyname"
                 />
                </Form.Group>


                <Form.Group>
                  <Button variant ="primary" type="submit">
                    Add Candidate
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