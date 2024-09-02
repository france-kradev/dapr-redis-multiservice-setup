const express = require('express');
const bodyParser = require('body-parser');
const axios= require('axios');

const app = express();
app.use(bodyParser.json());

const daprPort = process.env.DAPR_HTTP_PORT || 3500;
const stateStoreName = `statestore`;
const stateUrl = `http://dapr:${daprPort}/v1.0/state/${stateStoreName}`;
const port = 3000;

app.get('/messages', (_req, res) => {
    axios.get(`${stateUrl}/messages`, {
        headers: {
            'dapr-api-token': '1234', // check DAPR_API_TOKEN in docker-compose.yml
        }
    }).then(({data}) => {
        console.log(data)
       res.send(data);
    }).catch((e) => {
        res.status(500).json({error: e.message});
    })
});

app.post('/messages', (req, res) => {
    const { message } = req.body;

    const state = [{
        key: "messages",
        value: message
    }];

    axios.post(stateUrl, JSON.stringify(state), {
        headers: {
            'dapr-api-token': '1234', // check DAPR_API_TOKEN in docker-compose.yml
            "Content-Type": "application/json"
        }
    }).then((c) => {
        res.status(200).send();
    }).catch((e) => {
        res.status(500).send({message: e});
    })
});


app.listen(port, () => console.log(`Node App listening on port ${port}!`));
