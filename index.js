const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const vrMatch = req.url.match(/^\/vr(\d+)?$/);
  
  if (vrMatch) {
    const vrNum = vrMatch[1] ? vrMatch[1] : '';
    const filename = vrNum ? `vr${vrNum}.html` : 'vr.html';
    const vrPath = path.join(__dirname, filename);
    
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
          .vr-links { margin: 30px 0; }
        </style>
      </head>
      <body>
        <h1>Welcome to Your JavaScript Project!</h1>
        <p>Hello, World!</p>
        <p>Server is running on http://localhost:3000</p>
        <div class="vr-links">
          <h2>VR Pages:</h2>
          <a href="http://localhost:3000/vr">VR</a>
          <a href="http://localhost:3000/vr1">VR 1</a>
          <a href="http://localhost:3000/vr2">VR 2</a>
          <a href="http://localhost:3000/vr3">VR 3</a>
          <a href="http://localhost:3000/vr4">VR 4</a>
          <a href="http://localhost:3000/vr5">VR 5</a>
        </div>
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
