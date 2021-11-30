import connection from '../database/database.js';

const getName = async (req, res) => {
  const token = req.body.token;

  try {
    const nameAux = await connection.query(`
      SELECT
        users.username
      FROM
        users
      JOIN
        sessions
      ON
        users.id = sessions.user_id
      WHERE
        sessions.token = $1;
    `, [token]);

    res.status(200).send(nameAux.rows[0].username);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
    return;
  }
};

export default getName;