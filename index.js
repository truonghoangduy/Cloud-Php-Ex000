const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello 222 World!'))

app.get("/ngayKeTiep", (req, res) => {
    console.log(req.query)
    if (req.query != null) {
        a = parseInt(req.query.ngay);
        b = parseInt(req.query.thang);
        c = parseInt(req.query.nam);
        day = new Date(`${c}-${b}-${a}`);
        console.log(day); // Apr 30 2000

        nextDay = new Date(day);
        nextDay.setDate(day.getDate() + 1);
        res.send({
            requestDay:day,
            nextDay:nextDay
        },200)


    } else {
        res.send("Missing parms", 400)
    }
})

app.get("/loaiTamGiac", (req, res) => {
    console.log(req.query)
    if (req.query != null) {
        a = req.query.a
        b = req.query.b
        c = req.query.c
        if (a < b + c && b < a + c && c < a + b) {
            if (a * a == b * b + c * c || b * b == a * a + c * c || c * c == a * a + b * b)
                sendRespone(res, "Day la tam giac vuong")
            else if (a == b == c)
                sendRespone(res, "Day la tam giac deu")
            else if (a == b || a == c || b == c)
                sendRespone(res, "Day la tam giac can")
            else if (a * a > b * b + c * c || b * b > a * a + c * c || c * c > a * a + b * b)
                sendRespone(res, "Day la tam giac tu")
            else
                sendRespone(res, "Day la tam giac nhon")
        }
        else {
            sendRespone(res, "Ba canh a, b, c khong phai la ba canh cua mot tam giac");

        }


    } else {
        res.send("Missing parms", 400)
    }
})

function sendRespone(res, result) {
    res.send(result, 200)
}


app.get('/services/calculating/:equation', (req, res) => {
    if (req.query.x != null && req.query.y != null && req.query.z != null) {
        x = parseInt(req.query.x);
        y = parseInt(req.query.y);
        z = parseInt(req.query.z);
        delta = (y * y - 4 * x * z)

        if (delta == 0) {
            x1 = -y / (2 * x);
            x2 = -y / (2 * x);
            var responeEquation = renderEquation({
                x: x,
                y: y,
                z: z
            })
            res.send(
                `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Bài Tập 03</title>
                </head>
                <body>
                    <div>
                        <h1> ${renderEquation} </h1>
                        <h4>This equation has double root
                        </h4>
                        <h4>For x1 =${x1}</h4>
                        <h4>For x2 =${x2}</h4>
                    </div>
                </body>
                </html>`
            )
        } else if (delta < 0) {
            var responeEquation = renderEquation({
                x: x,
                y: y,
                z: z
            })
            res.send(`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Bài Tập 03</title>
            </head>
            <body>
                <div>
                   <h1>${responeEquation}</h1>
                   <h3>This equation has no solution</h3>
                </div>
            </body>
            </html>`)
        }
        else if (delta > 0) {
            x1 = (-y - Math.sqrt(delta)) / (2 * x);
            x2 = (-y + Math.sqrt(delta)) / (2 * x);
            var responeEquation = renderEquation({
                x: x,
                y: y,
                z: z
            })
            res.send(`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Bài Tập 03</title>
            </head>
            <body>
                <div>
                   <h1>${responeEquation}</h1>
                   <h3>The equations have two solutions</h3>
                   <h4>For x1 = ${x1}</h4>
                   <h4>For x2 = ${x2}</h4>
                </div>
            </body>
            </html>`)
        }

    } else {
        res.send("Missing parms", 400)
    }
})

function renderEquation(equationInURL) {
    var equation = equationInURL;
    return `${equation.x + 'x<sup>2</sup>'}${equation.y >= 0 ? ("+" + equation.y + 'x') : equation.y + 'x'}${equation.z >= 0 ? ("+" + equation.z) : equation.z}=0`

}




app.listen(process.env.PORT || 3000, () => console.log(`Example app listening at http://localhost:${port}`))
