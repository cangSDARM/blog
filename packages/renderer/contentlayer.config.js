import { defineDocumentType, makeSource } from "contentlayer/source-files";
import process from "node:process";

const MdxPath = "mdx";
const DEFAULT_COLLECTION = "blog";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.{md,mdx}`,
  contentType: "markdown", //internal mdx has error. cannot be process.
  // fields are missing...
  // fields: {
  //   title: {
  //     type: "string",
  //     description: "The title of the post",
  //     required: true,
  //   },
  // },
  computedFields: {
    extra_info: {
      type: "json",
      resolve: (post) => {
        const url = post._raw.flattenedPath;
        const [collection = DEFAULT_COLLECTION, ...slug] = url.split("/");

        return {
          collection,
          slug,
          url,
          absPath:
            process.cwd() + "/" + MdxPath + "/" + post._raw.sourceFilePath,
        };
      },
    },
  },
}));

export default makeSource({
  contentDirPath: MdxPath,
  documentTypes: [Post],
  onUnknownDocuments: "fail",
  fieldOptions: {
    typeFieldName: "ContentlayerDocumentType",
  },
});
