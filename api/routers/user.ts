import { Router } from "express";
import { Pool } from "../server";
import { MysqlError } from "mysql";

//types
import { userType } from "../types/userTypes";

export const userRouter = Router();

//ユーザーを登録する処理を行うAPI
userRouter.post("/register", (req, res) => {
    const { email }: { email: string } = req.body;

    //DBに同じユーザーがいないかを確認
    Pool.getConnection((err, con) => {
        if (err) return res.status(500).json({ message: "ユーザー情報の取得ができません。" });
        const sql = `SELECT * FROM User WHERE email = ?`;

        con.query(sql, [email], (err: MysqlError | null, users: userType[]) => {
            if (err) return res.status(500).json({ message: "ユーザー情報の取得に失敗しました。" });
            if (users.length > 0) {
                return res.status(500).json({ message: "すでにユーザーが存在します。" });
            };
        });

        con.release();
    });

    //入力されたメールアドレスが退会状態になっているかを確認
    Pool.getConnection((err, con) => {
        if (err) return res.status(500).json({ message: "退会ユーザー情報の取得ができません。" });
        const sql = `SELECT * FROM User WHERE email = ? AND deleted_at IS NOT NULL`;

        con.query(sql, [email], (err: MysqlError | null, users: userType[]) => {
            if (err) return res.status(500).json({ message: "退会ユーザー情報の取得に失敗しました。" });
            if (users.length > 0) {
                const deleteSql = `DELETE FROM User WHERE email = ?`;
                con.query(deleteSql, [email], (err) => {
                    if (err) return res.status(500).json({ message: "ユーザー消去に失敗しました。" });
                });
            };
        });

        con.release();
    });

    Pool.getConnection((err, con) => {
        if (err) return res.status(500).json({ message: "ユーザー登録ができません。" });

        const sql = `INSERT INTO User (username, email, created_at) VALUES (?, ?, ?)`;
        const userData = generateUserInfo(email);
        con.query(sql, [userData.username, email, userData.formattedDate], (err) => {
            if (err) return res.status(500).json({ message: "ユーザー登録に失敗しました。" });
        });

        con.release();
    });

    return res.status(201).json({ message: "ユーザー登録が完了しました。" });
});

//ユーザーを登録するAPI（Googleアカウント）
userRouter.post("/register_google", (req, res) => {
    const email: string = req.body.email;
    
    Pool.getConnection((err, con) => {
        if (err) return res.status(500).json({ message: "ユーザー情報の取得ができません。" });

        const fetchSql = `SELECT * FROM User WHERE email = ?`;
        con.query(fetchSql, [email], (err, users: userType[]) => {
            if (err) return res.status(500).json({ message: "ユーザー情報の取得に失敗しました。" });

            if (users.length > 0) {
                return res.status(200).json({ message: "ユーザーはすでに登録されています。" });
            } else {
                const registerSql = `INSERT INTO User (username, email, created_at) VALUES (?, ?, ?)`;
                const userData = generateUserInfo(email);
                con.query(registerSql, [userData.username, email, userData.formattedDate], (err) => {
                    if (err) return res.status(500).json({ message: "ユーザー情報の登録に失敗しました。" });
                    return res.status(201).json({ message: "ユーザーの登録が完了しました。" });
                });
            };
        });
        con.release();
    });
});

//ユーザー情報の取得
userRouter.post("/fetch_user", (req, res) => {
    const userEmail: string = req.body.email;

    Pool.getConnection((err, con) => {
        if (err) return res.status(500).json({ message: "ユーザー情報の取得ができません。" });

        const fetchSql = `SELECT * FROM User WHERE email = ?`;
        con.query(fetchSql, [userEmail], (err: MysqlError | null, users: userType[]) => {
            if (err) return res.status(500).json({ message: "ユーザー情報の取得に失敗しました。" });

            const user: userType = users[0];
            return res.status(200).json(user);
        });

        con.release();
    });
});

//ユーザー登録に必要な情報を生成する処理
const generateUserInfo = (email: string) => {
    const now = new Date(Date.now());
    const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');   
    
    const userEmailArr = email.split("");
    const atIndex = userEmailArr.indexOf("@");
    const newUserEmailArr = userEmailArr.slice(0, atIndex);
    const username = newUserEmailArr.join("");

    return {formattedDate: formattedDate, username: username };
};