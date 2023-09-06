export default class UserInfo {
  constructor(nameSelector, jobSelector, avatorselector) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatorselector);
  }

  //   returns an object with information about the user to display the user data in the open form.
  getUserInfo() {
    this._userInfo = {
      name: this._name.textContent,
      about: this._job.textContent,
    };
    return this._userInfo;
  }

  getUserPhoto() {
    this._userInfo = { avatar: this._avatar.src };
    return this._userInfo;
  }

  //   takes new user data and adds it on the page.
  setUserInfo(obj) {
    this._name.textContent = obj.name;
    this._job.textContent = obj.about;
  }

  setUserPhoto(obj) {
    this._avatar.src = obj.avatar;
  }
}
