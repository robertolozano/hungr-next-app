import { makeAutoObservable } from "mobx";

class ScreenSizeStore {
  width = 1024; // Default value to avoid SSR issues

  constructor() {
    makeAutoObservable(this);
  }

  setWidth = (width) => {
    this.width = width;
  };

  get isMobile() {
    return this.width <= 768;
  }

  get isTablet() {
    return this.width > 768 && this.width <= 1024;
  }

  get isDesktop() {
    return this.width > 1024;
  }
}

const screenSizeStore = new ScreenSizeStore();
export default screenSizeStore;
