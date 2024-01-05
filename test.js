const axios = require('axios');

const getUrlAzure = async () => {
    const response = await axios.get('https://dev.azure.com/nxsdev3/VotacionAccionaria/_apis/git/repositories/EventosServicios.Front.App/commits', {
        params: {
            'searchCriteria.top': 1,
            'searchCriteria.itemVersion.version': 'main',
            'api-version': '7.1-preview.1'
        },
        auth: {
            username: 'camoreno',
            password: 'r3hdrpn3zh64b5sbdd3ltakaliw2vtxyem6yxovbh3sx5o2i5hqa'
        }
    });
    console.log(response.data)
};

getUrlAzure();