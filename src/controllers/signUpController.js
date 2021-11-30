import connection from '../database/database.js';
import bcrypt from 'bcrypt';

const singUp = async (req, res) => {
  try {
    const user = await connection.query(`
      SELECT
        *
      FROM
        users
      WHERE
        username = $1;
    `, [req.body.username]);

    if (user.rowCount === 0) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      await connection.query(`
        INSERT INTO
          users (username, password)
        VALUES
          ($1, $2);
      `, [req.body.username, hash]);

      res.sendStatus(200);
      return;
    }

    res.sendStatus(409);
    return;
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
    return;
  }
};

export default singUp;