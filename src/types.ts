import {z} from 'zod'

const CategoriesSchema = z.object({
  data: z.array(
    z.object({
      attributes: z.object({
        name: z.string(),
      }),
    }),
  ),
})

const ImageSchema = z.object({
  data: z.object({
    attributes: z.object({
      url: z.string(),
      caption: z.string(),
      width: z.number(),
      height: z.number(),
      size: z.number(),
    }),
  }),
})

export const PostSchema = z.object({
  title: z.string(),
  author: z.string(),
  slug: z.string(),
  subtitle: z.string(),
  categories: CategoriesSchema,
  image: ImageSchema,
})

const Attributes = z.object({
  attributes: PostSchema,
})

export const PostsSchema = z.array(Attributes)

export type PostType = z.infer<typeof Attributes>
