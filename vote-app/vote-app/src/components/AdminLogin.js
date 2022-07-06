import React, {Component} from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { Snackbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";




export class AdminLogin extends Component{
  
      
        constructor(props){
        super(props);
        this.state = {addModalShow : false, editModalShow: false};
    
         this.state = {Snackbaropen: false, Snackbarmsg: ''}
        this.handlesubmit = this.handlesubmit.bind(this);
    }
    
SnackbarClose = (event)=>{
    this.setState({Snackbaropen:false});
}
    handlesubmit(event){
      event.preventDefault();
      
      fetch('https://localhost:44337/api/admin/login',{
        method: 'POST',
        headers:{
          'Accept':'application/json',
          'Content-type': 'application/json'
        },
        body:JSON.stringify({
          Admin_id : event.target.Admin_id.value,
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
      //let addModalClose =() => this.setState({addModalShow:false});
      
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


        
            <Row>
              <Col sm ={6}>
              <Form onSubmit={this.handlesubmit}>
                <Form.Group controlId ="Adminlogin">
                 <h3>Admin LOGIN</h3>
                 <Form.Label>voter_id</Form.Label>
                 <Form.Control
                 type = "number"
                 name= "Admin_id"
                 required
                 placeholder="Admin_id"
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
                  <Button variant ="success" type="submit">
                    SIGN IN ADMIN
                  </Button>
                  </div>
                </Form.Group>

              </Form>
              </Col>  
            </Row>
               
                      
            
      
            
            
           


    </div>
        );
    }
}
