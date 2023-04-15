import askGPT from '../../gpt/askGPT.js';
import prompts from '../../gpt/prompts.js';

const createImageConfig = async (name, logoUrl, title) => {
  const normalizedTitle = await askGPT(prompts.normalizeTitle(title));
  const inviteMessage = `Hey ${name}, you and other ${normalizedTitle} are invited to a fireside chat with Andrew Swain`;

  return {
    template: 'V4WN6JDx09PWD3Gqjk',
    modifications: [
      {
        name: 'image_container',
        image_url:
          'https://res.cloudinary.com/crunchbase-production/image/upload/c_thumb,h_170,w_170,f_auto,g_faces,z_0.7,b_white,q_auto:eco,dpr_1/v1398424615/xi0a4dqm2pf6elwtccpr.jpg',
      },
      {
        name: 'event_name',
        text: 'FinTech Americas 2023',
        color: null,
        background: null,
      },
      {
        name: 'name',
        text: 'Andrew Swain',
        color: null,
        background: null,
      },
      {
        name: 'event_role',
        text: 'CoFounder of Emergent Layer',
        color: null,
        background: null,
      },
      {
        name: 'footer',
        text: 'April 17-20 @RA 6h 47m 21s | Dec +24° 53′ 1',
        color: null,
        background: null,
      },
      {
        name: 'logo_container',
        image_url: logoUrl,
      },
      {
        name: 'dynamic_message',
        text: inviteMessage,
        color: null,
        background: null,
      },
    ],
    webhook_url: null,
    transparent: false,
    metadata: null,
  };
};

export default createImageConfig;
