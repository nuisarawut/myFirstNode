const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === '/vr') {
    const vrPath = path.join(__dirname, 'vr.html');
    fs.readFile(vrPath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<h1>404 - Page Not Found</h1>');
        res.end();
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>JavaScript Project</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f0f0f0; }
          h1 { color: #333; }
          p { color: #666; font-size: 18px; }
          a { color: #0066cc; text-decoration: none; font-size: 16px; margin: 10px; display: inline-block; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <h1>Welcome to Your JavaScript Project!</h1>
        <p>Hello, World!</p>
        <p>Server is running on http://localhost:3000</p>
        <p><a href="http://localhost:3000/vr">→ Visit VR Page</a></p>
      </body>
      </html>
    `);
    res.end();
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
