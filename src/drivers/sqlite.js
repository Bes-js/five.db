const database = require('better-sqlite3');

class Database {
  constructor(type) {
    if(type === "sqlite")
    this.table = "five";
    this.db = database('five.db');
    this.db.prepare(`CREATE TABLE IF NOT EXISTS ${this.table} (ID TEXT, json TEXT)`).run();
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
    const row = this.db.prepare(`SELECT json FROM ${this.table} WHERE ID = @key`)
    .get({
    key,
    });
    return row != null ? !isNaN(row.json) ? parseInt(row.json) : JSON.parse(row.json) : null;
  }

  all() {
    const all = this.db.prepare(`SELECT * FROM ${this.table}`);
    const data = [];
    for (const row of all.iterate()) {
        data.push({
            ID: row.ID,
            value: !isNaN(row.json) ? parseInt(row.json) : JSON.parse(row.json),
        });
    }
    return data;
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
    
    let exists = this.get(key);
    exists == 0 ? exists = true : ""
    if(exists) this.db.prepare(`UPDATE ${this.table} SET json = (?) WHERE ID = (?)`).run(JSON.stringify(value), key);
    else this.db.prepare(`INSERT INTO ${this.table} (ID,json) VALUES (?,?)`).run(key, JSON.stringify(value));
    return true;
  }

  delete(key) {
    if(key == null) throw new Error("İlk bağımsız değişken (anahtar) eksik");
    if(typeof key != "string") throw new Error("İlk bağımsız değişkenin (anahtar) bir dize olması gerekir");
    this.db.prepare(`DELETE FROM ${this.table} WHERE ID=@key`).run({
      key,
    });
    return true;
  }

  deleteValue(value) {
    if(key == null) throw new Error("İlk bağımsız değişken (değer) eksik");
    this.db.prepare(`DELETE FROM ${this.table} WHERE json=@value`).run({
      value,
    });
    return true;
  }

  deleteAll() {
    this.db.prepare(`DELETE FROM ${this.table}`).run();
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
     return Array.isArray(value) ? !value.includes(x) : JSON.stringify(x) !== JSON.stringify(value)
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