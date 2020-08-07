const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');

const FeedbackService = require('./services/FeedbackService')
const SpeakersService = require('./services/SpeakerService')

const feedbackService = new FeedbackService('./data/feedback.json')
const speakersService = new SpeakersService('./data/speakers.json')

const route = require('./routes');

const app = express();

const port = 3000;

app.set('trust proxy', 1);

app.use(cookieSession({
    name: 'session',
    keys: ['Gys8cmowdYimdpow', 'jnfioof73jirfioj932']
}))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.locals.siteName = 'ROUX Meetups';

// looks in the static folder and serves any matching files e.g. images, css, etc.
app.use(express.static(path.join(__dirname, './static')))

app.use(async (request, response, next) => {
    try {
        const names = await speakersService.getNames();
        response.locals.speakerNames = names;
        return next();
    } catch (error) {
        return next(error)
    }
})

app.use('/', route({
    feedbackService,
    speakersService
}));

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})