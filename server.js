// Expressセットアップ

const express = require("express");
const app = express();


// 各種モジュールのインポート

const mongoose = require("mongoose");
const helmet = require("helmet");
require("dotenv").config();


// アプリの設定

app.use(express.json());
app.use(helmet());


// APIルートの分割

const authRoute = require("./src/routes/authRoutes");
const userRoute = require("./src/routes/userRoutes");
const productRoute = require("./src/routes/productRoutes");
// const tradeRoute = require("./routes/trade");
// const groupRoute = require("./routes/group");


// APIルーティング

app.use("/client/auth", authRoute);
app.use("/client/user", userRoute);
app.use("/client/product", productRoute);
// app.use("/client/trade", tradeRoute);
// app.use("/client/group", groupRoute);


// MongoDBに接続

try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("DBに接続中");
} catch (err) {
    console.log(err);
}


// Express.jsサーバーの起動

app.listen(process.env.PORT, (req, res) => {
    console.log("サーバーが起動しました");
})