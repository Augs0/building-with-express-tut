const express = require('express');

const router = express.Router();

module.exports = (params) => {
    const { speakersService } = params;

    router.get('/', async (request, response, next) => {
        try {
            const speakers = await speakersService.getList();
            const artWork = await speakersService.getAllArtwork();
            return response.render('layout', { pageTitle: 'Speakers', template: 'speakers', speakers, artWork })
        } catch (error) {
            return next(error);
        }

    })

    router.get('/:shortname', async (request, response) => {
        const speaker = await speakersService.getSpeaker(request.params.shortname);
        const artWork = await speakersService.getArtworkForSpeaker(request.params.shortname)
        response.render('layout', { pageTitle: 'Speakers', template: 'speakers-detail', speaker, artWork })
    })

    return router;
}
