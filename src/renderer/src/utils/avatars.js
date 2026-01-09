// Import avatars
import avatarBlue from '../assets/avatars/avatar-blue.png';
import avatarGreen from '../assets/avatars/avatar-green.png';
import avatarOrange from '../assets/avatars/avatar-orange.png';
import avatarPurple from '../assets/avatars/avatar-purple.png';
import avatarRed from '../assets/avatars/avatar-red.png';
import avatarWhite from '../assets/avatars/avatar-white.png';

export const AVATARS = {
  blue: avatarBlue,
  green: avatarGreen,
  orange: avatarOrange,
  purple: avatarPurple,
  red: avatarRed,
  white: avatarWhite,
};

export const LOGIN_AVATARS = ['blue', 'green', 'orange', 'purple', 'red', 'white'];

export const DEFAULT_AVATAR = 'white';

export const getAvatar = (id) => AVATARS[id] || AVATARS[DEFAULT_AVATAR];
