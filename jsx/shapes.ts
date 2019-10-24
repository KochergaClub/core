import { FormShape } from '~/components/forms/types';
const shapes: { [k: string]: { [k: string]: FormShape } } = {
  "events": {
    "feedback": [
      {
        "name": "overall_score",
        "optional": true,
        "title": "Насколько вам понравилось мероприятие в целом?",
        "type": "number",
        "min": 0,
        "max": 10
      },
      {
        "name": "recommend_score",
        "optional": true,
        "title": "Насколько вероятно, что вы порекомендуете такое мероприятие знакомым?",
        "type": "number",
        "min": 0,
        "max": 10
      },
      {
        "name": "content_score",
        "optional": true,
        "title": "Насколько вам было интересно содержание?",
        "type": "number",
        "min": 0,
        "max": 10
      },
      {
        "name": "conductor_score",
        "optional": true,
        "title": "Насколько вы довольны работой ведущих?",
        "type": "number",
        "min": 0,
        "max": 10
      },
      {
        "name": "source",
        "optional": true,
        "title": "Откуда вы узнали про мероприятие?",
        "type": "choice",
        "options": [
          "FRIEND",
          "VK",
          "FB",
          "TIMEPAD",
          "EMAIL",
          "WEBSITE"
        ]
      },
      {
        "name": "custom_source",
        "optional": true,
        "title": "Откуда вы узнали про мероприятие? (свой вариант)",
        "type": "string"
      },
      {
        "name": "comment",
        "optional": true,
        "title": "Что можно улучшить?",
        "type": "string"
      }
    ]
  }
};
export default shapes;
