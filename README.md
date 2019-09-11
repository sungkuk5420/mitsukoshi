## SWTT-demo-app

### parcel 追加
```
npm install -g parcel-bundler
```

### package.json作成
```
npm init -y
```

### index.html作成
```
<html>
  <body>
    <script src="./index.js"></script>
  </body>
</html>
```
### index.js作成
```
//script
```

### package.jsonのscript修正
```
{
  "scripts": {
    "dev": "parcel index.html",
    "build": "parcel build index.html"
  }
}
```

### scss 追加
```
npm install -D sass
```

### parcel 実行
```
npm run dev
or
npm run build
```

### autoprefixer

```
npm i postcss-modules autoprefixer 
```

### heroku node app
```
node-static
```