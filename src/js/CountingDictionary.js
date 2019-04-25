class Dictionary {
  constructor(items) {
    this.items = items;
  }  
  static load(url) {
    return fetch(url)
      .then(response => response.json())
      .then(items => new this(items));
  }

  find(query) {
    var entry = this.items.find(e => e.word == query);
    return entry && entry.translation;
  }
}
class CountingDictionary extends Dictionary {
  countEntries() {
    return this.items.length;
  }
}

export default CountingDictionary;