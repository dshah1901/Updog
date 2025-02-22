import PostDTO from '../dto/posts'
import models from '../database/models'

export default class Activity {
  static POSTED = new Activity('POSTED')

  static LIKED = new Activity('LIKED')

  static SHARED = new Activity('SHARED')

  constructor(type) {
    this.type = type
  }

  static async retrieveActivities(following) {
    const postsActivity = []
    const likedPostsActivity = []
    const sharedPostsActivity = []

    await Promise.all(
      following.map(async (user) => {
        const unconvertedActivity = await this.getUnconvertedActivity(
          user.followedId
        )

        await Promise.all(
          unconvertedActivity[0].map(async (activity) => {
            const act = await this.convertToFeedActivity(
              this.POSTED,
              activity.id,
              activity.author,
              activity.createdAt
            )
            postsActivity.push(act)
          })
        )

        await Promise.all(
          unconvertedActivity[1].map(async (activity) => {
            const act = await this.convertToFeedActivity(
              this.LIKED,
              activity.postId,
              activity.userId,
              activity.createdAt
            )
            likedPostsActivity.push(act)
          })
        )

        await Promise.all(
          unconvertedActivity[2].map(async (activity) => {
            const act = await this.convertToFeedActivity(
              this.SHARED,
              activity.postId,
              activity.userId,
              activity.createdAt
            )
            sharedPostsActivity.push(act)
          })
        )
      })
    )

    const activity = [
      ...postsActivity,
      ...likedPostsActivity,
      ...sharedPostsActivity,
    ]
    activity.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))

    return activity
  }

  static convertToUserActivity(activity, postId, postTime) {
    return {
      postID: postId,
      timestamp: Date.parse(postTime),
      activity: activity.type,
    }
  }

  static async convertToFeedActivity(activity, postId, authorId, postTime) {
    const post = await models.posts.findByPk(postId)
    const postDto = await PostDTO.convertToDto(post)
    return {
      post: postDto,
      timestamp: Date.parse(postTime),
      activity: activity.type,
      userId: authorId,
    }
  }

  static async getUnconvertedActivity(userId) {
    // Retrieve user's posts, including the shared and liked posts
    const postsDB = await models.posts.findAll({
      where: {
        author: userId,
      },
    })

    const sharedPosts = await models.sharedPost.findAll({
      where: {
        userID: userId,
      },
    })

    const likedPosts = await models.likedPost.findAll({
      where: {
        userID: userId,
      },
    })

    // Merge the posts together into one array
    return [postsDB, likedPosts, sharedPosts]
  }
}
