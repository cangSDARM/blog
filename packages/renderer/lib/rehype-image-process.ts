import { getPlaiceholder } from "plaiceholder";
import { RehypeNode, isJsxElement } from "./utils";
import { visit } from "unist-util-visit";

const DefaultOptions = {
  blurDataURLPropertyName: "blurDataURL",
  placeholderPropertyName: "placeholder",
  srcTransform: (src: string) => src,
} as const;

export type Option = Partial<typeof DefaultOptions>;

// TODO: support possible images in jsxElement
function isImageNode(node: RehypeNode) {
  const img = node;

  return (
    img.type === "element" &&
    img.tagName === "img" &&
    img.properties &&
    typeof img.properties.src === "string"
  );
}

// Returns the props of given `src` to use for blurred images
export async function returnProps(src: string) {
  const { base64: blurDataURL, img } = await getPlaiceholder(src);

  const { width, height } = img;

  return {
    ...img,
    width,
    height,
    blurDataURL,
  };
}

async function addProps(node: RehypeNode, options: Option) {
  try {
    if (!node.properties) {
      node.properties = {};
    }

    const transformedSrc =
      options.srcTransform?.(node.properties.src) || node.properties.src;

    // return the new props we'll need for our image
    const { width, height, blurDataURL } = await returnProps(transformedSrc);

    // add the props in the properties object of the node
    // the properties object later gets transformed as props
    node.properties.width = width;
    node.properties.height = height;
    node.properties.src = transformedSrc;
    node.properties.sizes = `(max-width: ${width}px) 100vw, ${height}px`;
    node.properties.alt ||= transformedSrc;
    node.properties[options.blurDataURLPropertyName || "blurDataURL"] =
      blurDataURL;
    node.properties[options.placeholderPropertyName || "placeholder"] = "blur";
  } catch (e) {
    throw Error(`Invalid image with src: "${node.properties.src}"`, {
      cause: e,
    });
  }
}

// https://ironeko.com/posts/how-to-blurred-images-on-load-in-next-js
function rehypeImageProcess(options = DefaultOptions) {
  return async (root: RehypeNode) => {
    // Create an array to hold all of the images from the markdown file
    const images: RehypeNode[] = [];

    visit<any>(root, (node: RehypeNode, i, p) => {
      if (isImageNode(node)) {
        images.push(node);
      }
    });

    for (const image of images) {
      // Loop through all of the images and add their props
      await addProps(image, options);
    }

    return root;
  };
}

export default rehypeImageProcess;
