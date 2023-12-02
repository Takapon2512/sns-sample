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
        if (err) return res.status(500).json({ message: "ユーザーの取得ができません。" });
        const sql = `SELECT * FROM User WHERE email = ?`;

        con.query(sql, [email], (err: MysqlError | null, users: userType[]) => {
            if (err) return res.status(500).json({ message: "ユーザーの取得に失敗しました。" });
            if (users.length > 0) {
                return res.status(500).json({ message: "すでにユーザーが存在します。" });
            };
        });

        con.release();
    });

    //入力されたメールアドレスが退会状態になっているかを確認
    Pool.getConnection((err, con) => {
        if (err) return res.status(500).json({ message: "退会ユーザーの取得ができません。" });
        const sql = `SELECT * FROM User WHERE email = ? AND deleted_at IS NOT NULL`;

        con.query(sql, [email], (err: MysqlError | null, users: userType[]) => {
            if (err) return res.status(500).json({ message: "退会ユーザーの取得に失敗しました。" });
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

        const now = new Date(Date.now());
        const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');   
        
        const userEmailArr = email.split("");
        const atIndex = userEmailArr.indexOf("@");
        const newUserEmailArr = userEmailArr.slice(0, atIndex);
        const user = newUserEmailArr.join("");

        const sql = `INSERT INTO User (username, email, created_at) VALUES (?, ?, ?)`;
        con.query(sql, [user, email, formattedDate], (err) => {
            if (err) return res.status(500).json({ message: "ユーザー登録に失敗しました。" });
        });

        con.release();
    });

    return res.status(200).json({ message: "ユーザー登録が完了しました。" });
});