const BSON = require('bson');
const fs = require("node:fs")
const lodash = require("lodash");

class Database {
  constructor() {
    this.write = txt => fs.writeFile(this.file, txt, 'utf8', () => {});;
    this.file = "five.bson";
    try {
        this.database = BSON.deserialize(fs.readFileSync(this.file));
    } catch (e) {
        this.database = this.write("")
    }
  }

  math(key, value, sub = false) {
    if(value == null) throw new Error("İkinci bağımsız değişken 'value' eksik");
    if(typeof value != "number") throw new Error("İkinci bağımsız değişken 'sayı' türünde olmalıdır");
    let number = this.get(key);
    if(number == null) number = 0; 
    if(typeof number != "number") throw new Error("İlk bağımsız değişken 'sayı' türünde olmalıdır");
    sub ? number -= parseFloat(value) : number += parseFloat(value);
    this.set(key, number);
    return number;
  }

  setArray(value) {
    if(!Array.isArray(value)) return [value];
    else return value;
  }

  get(key) {
    if(key == null) throw new Error("İlk bağımsız değişken (anahtar) eksik");
    if(typeof key != "string") throw new Error("İlk bağımsız değişkenin (anahtar) bir dize olması gerekir");
    let row = lodash.get(this.database, key);
    return !row ? null : row;
  }

  all() {
    if(!this.database) return [];
    return Object.entries(this.database).map(([ID, value]) => {
      return { ID, value };
    });
  }

  includes(key) {
    if(key == null) throw new Error("İlk bağımsız değişken (anahtar) eksik");
    if(typeof key != "string") throw new Error("İlk bağımsız değişkenin (anahtar) bir dize olması gerekir");

    let exists = this.all().filter(x => x.ID.toLowerCase().includes(key.toLowerCase())).length !== 0
    return exists; 
  }

  set(key, value) {
    if(key == null) throw new Error("İlk bağımsız değişken (anahtar) eksik");
    if(typeof key != "string") throw new Error("İlk bağımsız değişkenin (anahtar) bir dize olması gerekir");
    if(value == null) throw new Error("İkinci bağımsız değişken (değer) eksik");

    lodash.set(this.database, key, value);
    this.write(BSON.serialize(this.database));
    return true;
  }

  delete(key) {
    if(key == null) throw new Error("İlk bağımsız değişken (anahtar) eksik");
    if(typeof key != "string") throw new Error("İlk bağımsız değişkenin (anahtar) bir dize olması gerekir");
    lodash.unset(this.database, key);
    return true;
  }

  deleteValue(value) {
    if(value == null) throw new Error("İlk bağımsız değişken (değer) eksik");

    this.all().filter(x => x.value === value).forEach(x => lodash.unset(this.database, x.ID));
    this.write(BSON.serialize(this.database));
    return true;
  }

  deleteAll() {
    this.database = {};
    this.write(BSON.serialize(this.database));
    return true;
  }

  has(key) {
    if(key == null) throw new Error("İlk bağımsız değişken (anahtar) eksik");
    const exists = this.get(key);
    return exists ? true : false;
  }

  push(key, value) {
    if(key == null) throw new Error("İlk bağımsız değişken (anahtar) eksik");
    if(typeof key != "string") throw new Error("İlk bağımsız değişkenin (anahtar) bir dize olması gerekir");
    if(value == null) throw new Error("İkinci bağımsız değişken (değer) eksik");

    let arr = this.get(key) ?? [];
    arr = this.setArray(arr)
    if(Array.isArray(value)) arr = arr.concat(value);
    else arr.push(value);
    this.set(key, arr);
    return arr;
  }

  pull(key, value) {
    if(key == null) throw new Error("İlk bağımsız değişken (anahtar) eksik");
    if(typeof key != "string") throw new Error("İlk bağımsız değişkenin (anahtar) bir dize olması gerekir");
    if(value == null) throw new Error("İkinci bağımsız değişken (değer) eksik");
    let arr = this.get(key) ?? [];
    arr = arr.filter(x => {
     return Array.isArray(value) ? !value.includes(x) : JSON.stringify(x) !== JSON.stringify(value);
    });
    this.set(key, arr);
    return arr;
  }

  add(key, value) {
    if(key == null) throw new Error("İlk bağımsız değişken (anahtar) eksik");
    if(typeof key != "string") throw new Error("İlk bağımsız değişkenin (anahtar) bir dize olması gerekir");
    if(value == null) throw new Error("İkinci bağımsız değişken (değer) eksik");
    return this.math(key, value);
  }

  sub(key, value) {
    if(key == null) throw new Error("İlk bağımsız değişken (anahtar) eksik");
    if(typeof key != "string") throw new Error("İlk bağımsız değişkenin (anahtar) bir dize olması gerekir");
    if(value == null) throw new Error("İkinci bağımsız değişken (değer) eksik");
    return this.math(key, value, true);
  }

}

module.exports = new Database();