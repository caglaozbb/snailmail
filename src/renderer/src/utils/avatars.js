// Import avatars
import bubi from '../assets/avatars/bubi.png';
import froggo from '../assets/avatars/froggo.png';
import hoppu from '../assets/avatars/hoppu.png';
import mochi from '../assets/avatars/mochi.png';
import ribbit from '../assets/avatars/ribbit.png';
import tomato from '../assets/avatars/tomato.png';
import bubbiChat from '../assets/avatars/bubbiChat.png';
import ribbitChat from '../assets/avatars/ribbitChat.png';

export const AVATARS = {
  bubi: bubi,
  froggo: froggo,
  hoppu: hoppu,
  mochi: mochi,
  ribbit: ribbit,
  tomato: tomato,
  bubbiChat: bubbiChat,
  ribbitChat: ribbitChat
};

export const LOGIN_AVATARS = ['bubi', 'hoppu', 'mochi', 'tomato'];

export const getAvatar = (id) => AVATARS[id] || AVATARS['bubi'];

