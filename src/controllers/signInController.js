import connection from '../database/database.js';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

const signIn = async (req, res) => {
  try {
    const user = await connection.query(`
      SELECT
        *
      FROM
        users
      WHERE
        username = $1;
    `, [req.body.username]);

    if (user.rowCount !== 0 && bcrypt.compare(req.body.password, user.rows[0].password)) {
      await connection.query(`
        DELETE FROM
          sessions
        WHERE
          user_id = $1;
      `, [user.rows[0].id]);

      const token = uuid();

      await connection.query(`
        INSERT INTO
          sessions (user_id, token)
        VALUES
          ($1, $2);
      `, [user.rows[0].id, token]);

      res.status(200).send(token);
      return;
    }

    res.sendStatus(409);
    return;
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
    return;
  }
};

export default signIn;