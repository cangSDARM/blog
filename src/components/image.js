import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import PropTypes from "prop-types";
import React from "react";

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

const Image = ({ path, ext, ...otherProps }) => {
  const data = useStaticQuery(graphql`
    query {
      images: allFile(filter: { sourceInstanceName: { eq: "images" } }) {
        edges {
          node {
            relativePath
            childImageSharp {
              gatsbyImageData(formats: [AUTO, WEBP, AVIF])
            }
          }
        }
      }
    }
  `);
  const image = data.images.edges.find(
    (image) => image.node.relativePath === `${path}.${ext}`
  );
  return image?.node ? (
    <GatsbyImage image={getImage(image?.node)} {...otherProps} alt={path} />
  ) : (
    <div>
      Not Found this image at {path}.{ext}
    </div>
  );
};

Image.defaultProps = {
  path: "gatsby-astronaut",
  ext: "png",
};

Image.prototype = {
  path: PropTypes.string.isRequired,
  ext: PropTypes.string,
};

export default Image;
