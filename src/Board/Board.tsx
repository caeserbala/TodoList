import React from 'react';
import { List } from '../List/List';
import fireDatabase from '../firebaseConfig'
import firebase from 'firebase';
import { IList } from '../List/IList';
import './Board.css'
import { ICardDetails } from '../cardDetails/IcardDetails';


export class Board extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      cardDetails: []
    }
    this.addList = this.addList.bind(this);

  }

  componentDidMount() {

    const itemsRef = firebase.database().ref('cardDetails');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let updatedCardDetails = []
      if (!!items) {
        for (let [cardID, value] of Object.entries(items)) {
          if (!!value) {
            let newValue = { ...value as any, cardID }
            updatedCardDetails.push(newValue);
          }
        }
        this.setState({ cardDetails: updatedCardDetails });
      }
    });

  }

  addList(index: number) {
    const listRef = fireDatabase.ref('cardDetails');
    const cardDetails: ICardDetails = {
      listID: index,
      title: '',
      cardID: 0,
      desc: '',
      comments: []
    }

    listRef.push(cardDetails,
      (error) => {
        if (error) {
          this.setState({});
        } else {
          this.setState({});
        }
      });

  }

  filterListDetails(){
    let cardDetails = this.state.cardDetails;
    let listIDs  =Array.from(new Set(cardDetails.map((cardDetail: any) =>cardDetail.listID)));
    return listIDs.map((listID:any)=> cardDetails.filter((cardDetail: any)=> cardDetail.listID===listID));
    
  }

  render() {

    const listDetails = this.filterListDetails();

    const listIndex = listDetails.length;

    return (
      <div className="boardContainer">
        <h3>My Board</h3>
          <div className="listGroupContaier">
            {
              !!listDetails && listDetails.map((listDetail: IList, index: number) => <List {...listDetail} key={listDetail.listID} index={index} />)
            }
          </div>
          <button type="button" onClick={() => this.addList(listIndex)} className="btn btn-primary addButton">Add List</button>
      </div>);  
  }

}


