# One Tone – npm Scripts Starter

## 環境構築

### nodebrew / Node.jsのインストール

nodebrewをインストールの上、下記コマンドでNode.js v6.2.1をインストールする。

```
$ nodebrew install-binary v6.2.1
```

なお、nodebrew導入方法がわからない、nodebrewを使用せず既にNode.jsをインストールしている場合には[node.jsのversionを管理するためにnodebrewを利用する](http://qiita.com/sinmetal/items/154e81823f386279b33c)を参照。

### 実行環境のインストール

```
$ npm install
```


## 使用方法

### 初回起動
HTML／CSS／JavaScriptへのコンパイルと画像圧縮を開発モードで行う。

```
$ npm start
```

### 開発
ファイル監視とローカルサーバー起動など開発時に使用。

```
$ npm run dev
```

### ステージング環境あるいは本番環境用ファイルの生成
HTML／JavaScriptへのコンパイルについては開発／ステージング／本番環境で条件分岐を行う。

```
# ステージング
$ npm run stg

# 本番
$ npm run prd
```

### その他のコマンド
各タスクの実行コマンドは以下の通り。
開発/本番環境の分岐はコマンド実行時の引数で行います。

```
// Pug -> HTMLコンパイル
$ npm run build:html -- (DEV／STG／PRD)

// ES6／Scss -> JavaScript／CSSトランスパイル
$ npm run build:webpack -- (DEV／STG／PRD)

// 画像圧縮（時間がかかるため要注意）
$ npm run imagemin

// src/assets以下をdistへコピー
$ npm run copy

// サイトマップ生成
$ npm run sitemap

// ローカルサーバー起動
$ npm run server
```


## Features

* Pug (Rename from "Jade")
* Webpack
  * EcmaScript6 (ES2015~2017)
  * Scss
* Imagefile Minify
* BrowserSync
