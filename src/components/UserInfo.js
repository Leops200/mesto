export class UserInfo{
  constructor({nameSelector, activSelector, avatarSelector}){
    this._name = document.querySelector(nameSelector);
    this._activity = document.querySelector(activSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._id = null;
  };

  //
  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._activity.textContent,
      avatar: this._avatar.src
    };
  };

  // 
  setUserInfo(data) {
    this._name.textContent = data.name;
    this._activity.textContent = data.about;
    this._avatar.src = data.avatar;
    this._id = data._id;
  };

  getUserId() {
    return this._id;
  };
};
