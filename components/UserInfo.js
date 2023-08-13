export default class UserInfo {
  constructor(nameSelector, jobSelector) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
  }

  //   returns an object with information about the user to display the user data in the open form.
  getUserInfo() {
    this._userInfo = {
      name: this._name.textContent,
      description: this._job.textContent,
    };
    console.log(this._userInfo);
    return this._userInfo;
  }

  //   takes new user data and adds it on the page.
  setUserInfo(nameInput, jobInput) {
    this._name.textContent = nameInput;
    this._job.textContent = jobInput;
  }
}
