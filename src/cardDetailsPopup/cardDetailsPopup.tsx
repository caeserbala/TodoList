import React, { Component } from 'react';
import './cardDetailsPopup.css';
import fireDatabase from '../firebaseConfig'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import firebase from 'firebase';
import { ICardDetailsPopup } from './IcardDetailsPopup';
import { IList } from '../List/IList';

/** card detail popup */
export class CardDetailsPopup extends Component<ICardDetailsPopup, any> {
    displayPopup = false;
    commentsTag: any[] = [];
    feedBackMessage: string;
    updatePopup = false;
    constructor(props: any) {
        super(props);
        this.handleOutSideClick = this.handleOutSideClick.bind(this);

        this.deleteItem = this.deleteItem.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addComments = this.addComments.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.displayPopup = props.displayPopup;
        this.updatePopup = props.updatePopup;
        this.feedBackMessage = '';

        this.state = {
            title: '',
            desc: '',
            comments: [],
            cardID : this.props.cardID || 0
        }

        this.commentsTag = [...this.commentsTag, <input name={'comments'} type="text" className="form-control commentBottom"
            onChange={(event) => {
                let commentsArray = this.state.comments.slice();
                commentsArray[0] = event.target.value;
                this.setState({ comments: commentsArray });
            }} />];
    }

    handleSubmit(e: any) {
        e.preventDefault();
        const cardDetailsRef = fireDatabase.ref('cardDetails');

       
        const cardDetails: ICardDetailsPopup = {
            title: this.state.title,
            desc: this.state.desc,
            comments: this.state.comments,
            cardID: this.state.cardID
        }

        cardDetailsRef.push(cardDetails)
            .then(() => cardDetailsRef.once('value'))
            .then(snapshot => snapshot.val())
            .catch(error => ({
                errorCode: error.code,
                errorMessage: error.message
              }));

    }

    deleteItem() {
        const itemRef = firebase.database().ref(`/cardDetails/${this.props.cardID}`);
        itemRef.remove();
        this.updatePopup = false;
        this.setState({});
    }

    updateItem() {
        firebase.database().ref(`cardDetails/ ${this.props.cardID}`).update({
            title: this.state.title,
            desc: this.state.desc,
            comments: this.state.comments
        },
            (error) => {
                if (error) {
                    this.updatePopup = true;
                    this.feedBackMessage = 'error at processing value';
                    this.setState({});
                } else {
                    this.feedBackMessage = 'Data saved successfully';
                    this.updatePopup = false;
                    this.setState({});
                }
            })

    }

    handleChange(event: any) {

        this.setState({
            [event.target.name]: event.target.value
        });

    }

    componentDidMount() {
        this.displayPopup = this.props.displayPopup!;
        this.updatePopup = this.props.updatePopup!;
        this.setState({});
    }

    handleOutSideClick() {
        this.displayPopup = false;
        this.updatePopup = false;
        this.setState({});
    }

    addComments() {
        const index = this.commentsTag.length;
        this.commentsTag = [...this.commentsTag,
        <input name={'comments'} type="text" className="form-control commentBottom" key={'comments' + index}
            onChange={(event) => {
                let commentsArray = this.state.comments.slice();
                commentsArray[index] = event.target.value;
                this.setState({ comments: commentsArray });
            }} />
        ]

        this.setState({});
    }

    displayModalFooter() {
        let modalFooter = <button type="button" onClick={this.handleSubmit} className="btn btn-primary">Save changes</button>

        if (!!this.updatePopup) {
            modalFooter = <>
                <button type="button" onClick={this.deleteItem} className="btn btn-danger">Delete</button>
                <button type="button" onClick={this.updateItem} className="btn btn-primary">update changes</button>
            </>
        }

        return <div className="modal-footer">
            {modalFooter}
        </div>

    }

    displayHeader() {
        return <div className="modal-header">
            {!!this.displayPopup && <h5 className="modal-title">New Card</h5>}
            {!!this.updatePopup && <h5 className="modal-title">Update Card</h5>}

            <button type="button" className="close" onClick={() => this.handleOutSideClick()} data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    }

    displayModalBody() {
        return <div className="modal-body">
            <div className="mb-3">
                <label className="form-label">Card Title</label>
                <input name="title" type="text" className="form-control" onChange={this.handleChange} value={this.state.title || this.props.title} />
            </div>
            <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea name="desc" className="form-control" rows={4} cols={50} onChange={this.handleChange} value={this.state.desc || this.props.desc} />
            </div>
            <div className="mb-3">
                <label className="form-label">Comments</label>
                {!!this.displayPopup && this.commentsTag.map(value => value)}

                {!!this.updatePopup && !!this.props.comments && this.props.comments.map((value: any, index: number) => <input name={'comments'} type="text" className="form-control commentBottom" key={'comments' + index}
                    value={this.state.comments[index] || value}
                    onChange={(event) => {
                        let commentsArray = this.state.comments.slice();
                        commentsArray[index] = event.target.value;
                        this.setState({ comments: commentsArray });
                    }} />)}
                {!!this.displayPopup && <div>
                    <label className="form-label">Add comments</label>
                    <FontAwesomeIcon icon={faPlusCircle} onClick={this.addComments} size={'lg'} color={'grey'} />
                </div>}
            </div>
        </div>
    }

    checkModalStatus() {


        const displayModal = <div className="modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    {this.displayHeader()}
                    {this.displayModalBody()}
                    {this.displayModalFooter()}
                </div>
            </div>
        </div>;


        if (!!this.displayPopup || this.updatePopup) {
            return displayModal;
        } else {
            return null;
        }

    }


    render() {
        return (this.checkModalStatus());
    }
}
