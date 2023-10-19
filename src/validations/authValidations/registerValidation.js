const { body } = require("express-validator");
const User = require("../../models/users");


// 新規登録バリデート処理

exports.registerValidation = [
    body("username").isLength({min: 1, max: 30}).withMessage("ユーザーネームは1~30字である必要があります"),
    body("username").custom((value) => {
        if (value.trim() === "") {throw new Error("ユーザーネームは空白のみの入力が出来ません")}
        return true;
    }),
    body("userId").custom((value) => {
        if (!value.match(/^([a-zA-Z0-9_]{3,30})$/)) {throw new Error("ユーザーIDは3~30字の英数字か_である必要があります")}
        return true;
    }),
    body("userId").custom((value) => {
        return User.findOne({userId: value}).then((user) => {
            if (user) {return Promise.reject("このユーザーIDはすでに使用されています")}
        })
    }),
    body("password").custom((value) => {
        if (!value.match(/^([a-zA-Z0-9]{8,30})$/)) {throw new Error("パスワードは8~30字の英数字である必要があります")}
        return true;
    }),
    body("confirmPassword").custom((value) => {
        if (!value.match(/^([a-zA-Z0-9]{8,30})$/)) {throw new Error("確認用パスワードは8~30字の英数字である必要があります")}
        return true;
    }),
    body("confirmPassword").custom((value, {req}) => {
        if (value !== req.body.password) {throw new Error("パスワードが一致しません")}
        return true;
    }),
    body("postalCode").notEmpty().withMessage("郵便番号を入力して下さい"),
    body("postalCode").isPostalCode("JP").withMessage("正しい郵便番号を入力して下さい"),
    body("address").notEmpty().withMessage("住所を入力して下さい"),
    body("phoneNumber").notEmpty().withMessage("電話番号を入力して下さい"),
    body("phoneNumber").isMobilePhone("ja-JP").withMessage("正しい電話番号を入力して下さい"),
    body("phoneNumber").custom((value) => {
        return User.findOne({phoneNumber: value}).then((user) => {
            if (user) {return Promise.reject("この電話番号はすでに使用されています")}
        })
    }),
    body("unverifiedEmail").notEmpty().withMessage("メールアドレスを入力して下さい"),
    body("unverifiedEmail").isEmail().withMessage("正しいメールアドレスを入力して下さい"),
    body("unverifiedEmail").custom((value) => {
        return User.findOne({email: value}).then((user) => {
            if (user) {return Promise.reject("このメールアドレスはすでに使用されています")}
        })
    }),
    body("confirmEmail").notEmpty().withMessage("確認用メールアドレスを入力して下さい"),
    body("confirmEmail").isEmail().withMessage("正しい確認用メールアドレスを入力して下さい"),
    body("confirmEmail").custom((value, { req }) => {
        if (value !== req.body.unverifiedEmail) {throw new Error("メールアドレスが一致しません")}
        return true;
    }),
];