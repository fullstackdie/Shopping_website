const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Welcome to Node js</title></head>");
    res.write(
      '<body><h1>Add User</h1><ul><li>Aravind</li><li>Kumar</li></ul><form action="/create-user" method="POST"><input type="text" name="message"><button type="submit">Upload</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const text = parsedBody.split("=")[1];
      fs.writeFileSync("message.txt", text);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }
});
server.listen(3000);
