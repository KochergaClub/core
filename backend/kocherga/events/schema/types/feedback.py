import graphql

src = """type EventsFeedback {
  id: ID!
  overall_score: Int
  recommend_score: Int
  content_score: Int
  conductor_score: Int

  source_friend: Boolean!
  source_vk: Boolean!
  source_fb: Boolean!
  source_timepad: Boolean!
  source_email: Boolean!
  source_website: Boolean!

  custom_source: String
  comment: String
}"""

EventsFeedback = graphql.build_ast_schema(graphql.parse(src)).get_type('EventsFeedback')
