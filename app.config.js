import 'dotenv/config';
import "./.env";
export default {
  expo: {
    name: 'MyApp',
    slug: 'myapp',
    version: '1.0.0',
    extra: {
      GOOGLE_APIKEY: process.env.GOOGLE_APIKEY
    },
  },
};
