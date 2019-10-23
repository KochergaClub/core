const shapes: { [k: string]: { [k: string]: FormShape } } = {
  "events": {
    "feedback": [
      {
        "name": "id",
        "optional": true,
        "type": "number",
        "readonly": true
      },
      {
        "name": "overall_score",
        "optional": true,
        "type": "number"
      },
      {
        "name": "recommend_score",
        "optional": true,
        "type": "number"
      },
      {
        "name": "content_score",
        "optional": true,
        "type": "number"
      },
      {
        "name": "conductor_score",
        "optional": true,
        "type": "number"
      },
      {
        "name": "comment",
        "optional": true,
        "type": "string"
      }
    ]
  }
};
export default shapes;
