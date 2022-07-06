import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddVote } from './AddVote';

export class Voter extends Component {
  constructor(props) {
    super(props);
    this.state = { cans: [], addModalShow: false };
  }

  componentDidMount() {
    this.refreshList();
  }
  refreshList() {
    fetch('https://localhost:44337/api/candidate/getallcandidates')
      .then(response => response.json())
      .then(data => {
        this.setState({ cans: data });
      }
      );
  }
  render() {
    console.log(this.props);
    const { cans } = this.state;
    let addModalClose = () => this.setState({ addModalShow: false });
    return (
      <><h1>Candidate List</h1>
        <Table className='mt-4' striped bordered hover size='small'>
          <thead>
            <th>PartyID</th>
            <th>Partyname</th>
            <th>CandidateName</th>

          </thead>
          <tbody>
            {cans.map(can => <tr key={can.Party_id}>
              <td> {can.Party_id}</td>
              <td> {can.partyname}</td>
              <td>{can.candidatename}</td>

            </tr>
            )}
          </tbody>
        </Table>
        <ButtonToolbar>
          <Button variant="primary"
            onClick={() => this.setState({ addModalShow: true })}
          > Add Vote
          </Button>
        </ButtonToolbar>
        <AddVote
          show={this.state.addModalShow}
          onHide={addModalClose}>
        </AddVote>
      </>
    )
  }
}
