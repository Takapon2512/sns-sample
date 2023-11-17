import express from "express";
import { createPool } from "mysql";
import { v4 as uuidv4 } from "uuid";
import { genSaltSync, hashSync } from "bcryptjs";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = 8080;

//MySQL
export const Pool = createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: "sns-sample",
    port: 3306
});

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

//データの型
type RegisterType = {
    username: string;
    email: string;
    password: string;
};

//新規登録API
app.post("/api/v1/auth/register", (req, res) => {
    const { username, email, password }: RegisterType = req.body;

    Pool.getConnection((err, con) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "新規登録できません" });
        };

        //uuidを生成
        const randomUUID: string = uuidv4();

        //日付を記録
        const now = new Date();
        const formattedDate: string = now.toISOString().slice(0, 19).replace('T', ' ');

        //入力されたパスワードのハッシュ化
        const hashedPassword: string = hashSync(password, genSaltSync(10));

        const iconUrl = "/images/noicon.png"

        const registerSql = `INSERT INTO User 
        (username, email, password, userId, created_at, iconUrl) 
        VALUES (?, ?, ?, ?, ?, ?)`;
        
        con.query(registerSql, [
            username, 
            email, 
            hashedPassword, 
            randomUUID, 
            formattedDate,
            iconUrl
        ], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "新規登録に失敗しました。" });
            };

            return res.status(201).json({ message: "新規登録が完了しました。" });
        });

        con.release();
    });
});

app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`));
