export interface ICardDetails {
    listID?: number;
    cardID?: number;
    title: string;
    desc : string;
    comments: string[];
    displayPopup?: boolean;
    updatePopup?: boolean;
}