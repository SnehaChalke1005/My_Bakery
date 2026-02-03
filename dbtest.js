const mysql = require('mysql2');
const connection = mysql.createConnection({ 
  host: 'localhost', 
  user: 'root', 
  password: 'root123', 
  // your MySQL root password 
  database: 'bakerydb' 
}); 
connection.connect((err) => { 
    if (err) { 
        console.error('❌ Error connecting to MySQL:', err); 
        return; 
    } 
    console.log('✅ Connected to MySQL successfully!'); 
    connection.end(); 
});