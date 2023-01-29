export class UserInfo{
  constructor({nameSelector, activSelector}){
    this._name = document.querySelector(nameSelector);
    this._activity = document.querySelector(activSelector);
  };

  //
  getUserInfo() {
    return {
      name: this._name.textContent,
      activity: this._activity.textContent
    };
  };

  // 
  setUserInfo(name, activity) {
    this._name.textContent = name;
    this._activity.textContent = activity;
  };
};
