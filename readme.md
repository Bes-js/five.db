# five.db Nedir?

`five.db` Diğer Veritabanı Modülleriyle Oynanmış Olan Veritabanı Modülüdür BSON Veritabanı Üzerine Kuluşmuştur.

## Nasıl Kurulur?

`five.db` Modülünü Kurmak İçin Bir Konsol Açın Ve Aşşağıdaki Kodu Yazın.

```shell
> npm i five.db@latest
```

Kurulumdan Sonra Modülü Hangi Veritabanı Stilinde Kullanıcağınızı Seçin.

Tanımlama;
```javascript
const db = require("five.db").five();
```

Paket Otomatikmen `five.db` Dosyası Oluşturacaktır.

## Örnek Kullanım 

```javascript
const db = require("five.db").five();
const client = require("discord.js");

client.on("messageCreate", async (message) => {

  if(message.content.includes("!sistem-aç")){

   db.set("saas",true); // 'saas' İsminde Veri Oluşturup Ona 'true' Değerini Veriyoruz
   message.reply("Sistem Başarıyla Açıldı.")

  }else if(message.content.includes("!sistem-kapat")){

   db.set("saas",false); // 'saas' İsmindeki Verimizi 'false' Değeriyle Değiştiriyoruz
   message.reply("Sistem Başarıyla Kapatıldı.")

  }else{

  let kontrol = await db.get("saas"); // 'saas' İsmindeki Verimizin Kayıtlı Olan Değerlerini Alıyoruz
  // Ve Verimizi kontrol Olarak Tanımlıyoruz
  
    if (kontrol == true) { // kontrol(Aldığımız Veri) 'true' Değerine Eşit İse Devam Ettir
    if (message.content.toLowerCase() === "sa"){
      message.reply("Aleyküm Selam.");
    }
  }
}
});
```

## Nasıl Kullanılır / Fonksiyonlar Nelerdir?

Veri Kaydetme / Ayarlama
```javascript
  db.set("beş", "5") // true ~ "5"
```

Veri Çağırma / Alma
```javascript
  db.get("beş") // "5"
  db.all() // [{ ID: "beş", value: "5" }]
```

Array İşlemleri
```javascript
    db.push("beş", ["5", "10"]) // ["5", "10"]
    db.pull("beş", "5") // ["10"]
```

Veri Kontrolü
```javascript
   db.has("beş") // 'true' veya 'false'
```
    
Veri Toplama / Çıkarma
```javascript
    db.add("deneme", 35) // +35
    db.sub("deneme", 30) // -30 | 35 - 30 = 5
```

Veri Silme / Sıfırlama
```javascript
    db.delete('beş') // Belirtilen Veriyi Siler
    db.deleteValue("5") // Veriler Arasından Belirtilen Değerdeki Verileri Siler
    db.deleteAll() // Bütün Verileri Siler / Format
```

<h1 align="center"> <img src="https://cdn.discordapp.com/emojis/842491787955142656.gif?size=128&quality=lossless" width="30px"> Destek & İletişim <img src="https://cdn.discordapp.com/emojis/842491787955142656.gif?size=128&quality=lossless" width="30px"> </h1>

[![Discord Presence](https://lanyard-profile-readme.vercel.app/api/928259219038302258?hideDiscrim=true)](https://discord.com/users/928259219038302258)
[![Discord Presence](https://lanyard-profile-readme.vercel.app/api/798615228728082462?hideDiscrim=true)](https://discord.com/users/798615228728082462)
