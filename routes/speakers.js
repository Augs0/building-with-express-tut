const express = require('express');

const router = express.Router();

module.exports = (params) => {
    const { speakersService } = params;

    router.get('/', async (request, response) => {
        const speakers = await speakersService.getList();
        const artWork = await speakersService.getAllArtwork();
        response.render('layout', { pageTitle: 'Speakers', template: 'speakers', speakers, artWork })
    })

    router.get('/:shortname', async (request, response) => {
        const speaker = await speakersService.getSpeaker(request.params.shortname);
        const artWork = await speakersService.getArtworkForSpeaker(request.params.shortname)
        response.render('layout', { pageTitle: 'Speakers', template: 'speakers-detail', speaker, artWork })
    })

    return router;
}
