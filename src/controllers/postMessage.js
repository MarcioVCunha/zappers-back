import connection from '../database/database.js';

const postMessage = async (req, res) => {
  if (req.body.messageToSend === '') {
    res.sendStatus(200);
    return;
  } else {

    const userId = await connection.query(`
      SELECT
        *
      FROM
        sessions
      WHERE
        token = $1;
    `, [req.body.token]);

    await connection.query(`
      INSERT INTO
        message (user_id, message)
      VALUES
        ($1, $2);
    `, [userId.rows[0].user_id, req.body.messageToSend]);

    res.sendStatus(200);
  }
};

export default postMessage;