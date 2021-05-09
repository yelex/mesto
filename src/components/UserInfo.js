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


  setUserInfo({ name, job, userId, avatarLink }) {
    this.userId = userId;
    this.avatarLink = avatarLink;
    setTextContent(this._userNameElement, name);
    setTextContent(this._userJobElement, job);
  }
}
