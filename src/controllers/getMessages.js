import connection from '../database/database.js';

const getMessages = async (req, res) => {
  try {
    const messages = await connection.query(`
      SELECT 
        users.username, message.message 
      FROM 
        message 
      JOIN 
        users 
      ON 
        users.id = message.user_id 
      ORDER BY 
        message.id 
      DESC LIMIT 100;
    `);

    res.status(200).send(messages.rows.reverse());
    return;
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
    return;
  }
};

export default getMessages;