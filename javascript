const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const PORT = 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Download endpoint
app.get('/download', async (req, res) => {
    const { url, format } = req.query;
    try {
        const videoId = ytdl.getURLVideoID(url);
        const info = await ytdl.getInfo(videoId);

        if (format === 'mp4') {
            const videoFormat = ytdl.chooseFormat(info.formats, { quality: 'highest', filter: 'videoandaudio' });
            res.redirect(videoFormat.url);
        } else if (format === 'mp3') {
            const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio', filter: 'audioonly' });
            res.redirect(audioFormat.url);
        } else {
            res.status(400).send('Invalid format');
        }
    } catch (error) {
        res.status(500).send('Error downloading video: ' + error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
