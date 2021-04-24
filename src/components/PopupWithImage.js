import Popup from "./Popup.js"
import { setTextContent } from "../utils/utils.js"

export default class PopupWithImage extends Popup  {
  constructor({ popupSelector, imageSelector, popupCaptionSelector }) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(imageSelector);
    this._popupCaption = this._popup.querySelector(popupCaptionSelector);
  }

  open({title, link}) {
    this._popupImage.src = link;
    this._popupImage.alt = title;
    setTextContent(this._popupCaption, title);
    super.open();
  }
}
