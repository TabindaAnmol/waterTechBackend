const references=require("../../References/customReferences")
const blogSchema=references.mongoose.Schema({
    "title":String,
    "description":String,
    "keywords":String,
    "blogImage":{type:String,default:null},
    "slug": { type: String, unique: true },
}, {
   timestamps:{createdAt:'created_at',updatedAt:'updated_at'},
})


const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')         // Replace spaces with -
      .replace(/[^\w\-]+/g, '')     // Remove all non-word chars
      .replace(/\-\-+/g, '-');      // Replace multiple - with single -
  };
  blogSchema.pre('save', async function (next) {
    if (this.isModified('title')) {
      let newSlug = slugify(this.title);
      let counter = 1;
      let originalSlug = newSlug;
  
      // Ensure uniqueness
      // const Blog = references.mongoose.model('Blog', blogSchema);
      // while (await Blog.findOne({ slug: newSlug })) {
      while (await this.constructor.findOne({ slug: newSlug })) {
        newSlug = `${originalSlug}-${counter++}`;
      }
  
      this.slug = newSlug;
    }
    next();
  });
 

module.exports=blogSchema;