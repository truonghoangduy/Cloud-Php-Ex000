const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/services/calendar/leapyear/'), (req, res) => {
    res.send("OK")
    console.log(req)
    if (req.query != null) {
        year = parseInt(req.query.year);
        if (year % 4 == 0 && year % 100 == 0 || year % 400 == 0) {
            res.send(
                `
                                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <body>
                    <h1 style="text-algin:center'>${year}<h1>
                    <h1 style="text-algin:center>Is leap year</h1>
                </body>
                </html>
                `
            )
        }else{

        }

    }else{
        res.send("Missing parms",400)
    }
}


app.get('/services/calculating/:equation', (req, res) => {
    if (req.query != null) {
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
                    <title>Document</title>
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
                <title>Document</title>
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
                <title>Document</title>
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

    }else{
        res.send("Missing parms",400)
    }
})

function renderEquation(equationInURL) {
    var equation = equationInURL;
    return `${equation.x + 'x<sup>2</sup>'}${equation.y >= 0 ? ("+" + equation.y + 'x') : equation.y + 'x'}${equation.z >= 0 ? ("+" + equation.z) : equation.z}=0`

}




app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
