import { ICardDetailsPopup } from "../cardDetailsPopup/IcardDetailsPopup";
import { ICardDetails } from "../cardDetails/IcardDetails";

export interface IList {
    listID : number;
    cardDetails: ICardDetails[];
}