# kami-logger

A pretty and simple way to store and view logs.

---

# demo

<a href="https://raw.githubusercontent.com/Ruhannn/kamilogger/refs/heads/main/images/demo.png" target="_blank">

![demo](https://raw.githubusercontent.com/Ruhannn/kamilogger/refs/heads/main/images/demo.png "demo")

</a>

# To get started

### install

```bash
npm i kami-logger
```

### using kami-logger

```js
import { kamiLogger } from "kami-logger";

app.use(kamiLogger());
```

# To save logs

### **It saves the following data:**

- **method**: request method (e.g., GET, POST).
- **status-code**: status code (e.g., 200, 404).
- **url**: requested URL.
- **execTime**: execution time of the request.
- **ip** (if possible): IP address of the requester.
- **referer** : referer URL (if available).
- **userAgent**: user agent of client.
- **time**: when the request was logged.

### if you are using mongoose

```js
import { kamiLogger } from "kami-logger";

app.use(kamiLogger({ isMongoose: true }));
```

### if you are using mongodb

```js
import { kamiLogger } from "kami-logger";

app.use(kamiLogger({ connectionString: "your_database_string" }));
```

#### _YES! that simple to save logs in database ;3_

**Example data**

```json
[
  {
    _id: ObjectId('67b2789b672459e2d179de0d'),
    log: {
      method: 'GET',
      status: '304',
      url: '/data',
      execTime: '1.968ms',
      ip: '127.0.0.1',
      referer: 'null',
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64; rv:135.0) Gecko/20100101 Firefox/135.0',
      time: '2025-02-16T23:45:31.340Z'
    }
  },
  {
    _id: ObjectId('67b278a8672459e2d179de0f'),
    log: {
      method: 'POST',
      status: '404',
      url: '/updated',
      execTime: '1.202ms',
      ip: '127.0.0.1',
      referer: 'http://localhost:5173/',
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
      time: '2025-02-16T23:45:44.477Z'
    }
  }
//   more
]
```

# advance

### you can specify collection

```js
app.use(kamiLogger({ collection: "myLogs" }));
```

### if you want to capped data you can

```js
app.use(
  kamiLogger({
    capped: {
      cappedMax: 10000000, // default is 10000000
      cappedSize: 1000,
    },
  })
);
```

## FAQ

### Is this going to slow down my database?

Kamilogger is designed to be lightweight, and by default, it uses capped data with a maximum size of 10,000,000 logs. You can also adjust the capped size if needed.e

## Feedback

If you have any feedback, feel free to reach out to [KamiRu](https://discord.com/users/819191621676695563) on Discord.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Authors

- [Ruhan](https://github.com/Ruhannn)

<!-- - [fateniel](https://github.com/fateniel) -->
