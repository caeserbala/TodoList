import React from 'react';
import { CardDetails } from '../cardDetails/cardDetails';
import firebase from 'firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './List.css'
import { CardDetailsPopup } from '../cardDetailsPopup/cardDetailsPopup';
import { ICardDetails } from '../cardDetails/IcardDetails';
import { ICardDetailsPopup } from '../cardDetailsPopup/IcardDetailsPopup';

/** List contains details of list in board */
export class List extends React.Component<any, any> {
  displayPopup = false;
  constructor(props: any) {
    super(props);
    this.state = {
      cardDetails: []
    }

  }

  componentDidMount() {


  }

  displayCard() {
    this.displayPopup = true;
    this.setState({});
  }


  render() {
    const propsValue = { ...this.props };
    let cardDetails = Object.values(propsValue);
    // removing last element which is iterate from index
    cardDetails.pop();
    const listID = this.props.index;
    return (<div className="listContainer col-sm-3" >

      <h4>List Item {listID} </h4>
      <div className="container">
        <div className="row shadow-1">
          {
            !!cardDetails && cardDetails.map((cardDetail: any, index: number) => <CardDetails {...cardDetail} key={cardDetail.cardID} />)
          }
        </div>
      </div>
      <FontAwesomeIcon icon={faPlusCircle} onClick={() => this.displayCard()} size={'3x'} color={'grey'} />
      {!!this.displayPopup && <CardDetailsPopup displayPopup={this.displayPopup} {...this.props} />}
    </div>
    )
  }
}

