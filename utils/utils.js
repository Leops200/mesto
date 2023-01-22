import { Card } from '../components/Card.js';
import {handleImageClick} from '../pages/index.js';
import {initialCards} from '../utils/constants.js';
import{cardsContainer} from '../utils/constants.js';

// Функция создания карточки
export const createCard = (item) =>{
  const card = new Card(item, '#card-template', /*handleImageClick*/);
  const cardElement = card.generateCard();
  return cardElement;
};
initialCards.forEach((item) => {
  cardsContainer.append(createCard(item));
});