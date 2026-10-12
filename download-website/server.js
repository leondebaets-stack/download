
const http = require("http");
const fs = require("fs");
const path = require("path");

const map = path.join(__dirname, "test.txt");

const server = http.createServer(function (req, res) {
    if (req.url === "/download") {
        fs.readFile(map, function (fout, inhoud) {
            if (fout) {
                res.writeHead(500);
                res.end("Het bestand kon niet worden gelezen.");
                return;
            }

            res.writeHead(200, {
                "Content-Type": "text/plain; charset=utf-8",
                "Content-Disposition": 'attachment; filename="test.txt"'
            });

            res.end(inhoud);
        });

        return;
    }

    if (req.url === "/" || req.url === "/index.html") {
        fs.readFile(
            path.join(__dirname, "index.html"),
            function (fout, inhoud) {
                if (fout) {
                    res.writeHead(500);
                    res.end("De website kon niet worden geladen.");
                    return;
                }

                res.writeHead(200, {
                    "Content-Type": "text/html; charset=utf-8"
                });

                res.end(inhoud);
            }
        );

        return;
    }

    res.writeHead(404);
    res.end("Pagina niet gevonden.");
});

server.listen(3000, "127.0.0.1", function () {
    console.log("Website gestart op http://127.0.0.1:3000");
});
