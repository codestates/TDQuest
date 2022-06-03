enum Items {
  status = "status",
  characterInfo = "characterInfo",
  useInfo = "useInfo",
  accessToken = "accessToken",
}

export class LocalStorage<K extends Items, T> {
  constructor(private key: K) {}

  getItem() {
    return JSON.parse(localStorage.getItem(this.key) as string);
  }

  setItem(value: T) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  clearItem() {
    localStorage.removeItem(this.key);
  }
}
