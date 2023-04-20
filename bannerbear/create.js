import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

const data = {
  video_template: '9JWBASDKLpQPvbX5R93Gk',
  input_media_url: 'https://www.bannerbear.com/my/video.mp4',
  modifications: [
    {
      name: 'layer1',
      text: 'This is my text',
    },
  ],
};
fetch('https://api.bannerbear.com/v2/videos', {
  method: 'POST',
  body: JSON.stringify(data),
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.BANNERBEAR_API_KEY}`,
  },
});

<div style="position: relative; padding-bottom: 57.26405090137858%; height: 0;">
  <iframe
    src="https://www.loom.com/embed/cb480de6ac8941f39784d4a8902f2b82"
    frameborder="0"
    webkitallowfullscreen
    mozallowfullscreen
    allowfullscreen
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
  ></iframe>
</div>;
