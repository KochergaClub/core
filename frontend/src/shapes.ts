import { FormShape } from '~/components/forms/types';
const shapes: { [k: string]: { [k: string]: FormShape } } = {
  "events": {
    "feedback": [
      {
        "name": "id",
        "optional": true,
        "title": "ID",
        "type": "number",
        "readonly": true
      },
      {
        "name": "event_id",
        "type": "string"
      },
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
        "name": "source_friend",
        "optional": false,
        "title": "Откуда / Знакомые",
        "type": "boolean"
      },
      {
        "name": "source_vk",
        "optional": false,
        "title": "Откуда / ВКонтакте",
        "type": "boolean"
      },
      {
        "name": "source_fb",
        "optional": false,
        "title": "Откуда / Facebook",
        "type": "boolean"
      },
      {
        "name": "source_timepad",
        "optional": false,
        "title": "Откуда / Timepad",
        "type": "boolean"
      },
      {
        "name": "source_email",
        "optional": false,
        "title": "Откуда / Почтовая рассылка",
        "type": "boolean"
      },
      {
        "name": "source_website",
        "optional": false,
        "title": "Откуда / Сайт Кочерги",
        "type": "boolean"
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
