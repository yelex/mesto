import { setTextContent } from '../utils/utils.js'

export default class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userJobElement = document.querySelector(userJobSelector);
  }

  getUserInfo() {
    const userName = this._userNameElement.textContent;
    const userJob = this._userJobElement.textContent;
    return { userName, userJob }
  }

  setUserInfo({ userName, userJob }) {
    setTextContent(this._userNameElement, userName);
    setTextContent(this._userJobElement, userJob);
  }
}
