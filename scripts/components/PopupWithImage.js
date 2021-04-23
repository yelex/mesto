import Popup from "./Popup.js"
import { setTextContent, popupCaption, popupImageFigure } from "../utils/utils.js"

export default class PopupWithImage extends Popup  {
  open(name, link) {
    popupImageFigure.src = link;
    popupImageFigure.alt = name;
    setTextContent(popupCaption, name);
    super.open();
  }
}
