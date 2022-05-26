import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Meta = (props) => {
  return (
    <HelmetProvider>
      <Helmet>
        <meta charset="utf-8" />
        <title>{props.title}</title>
        {/* SEO 태그 */}
        <meta name="description" content={props.description} />
        <meta name="keywords" content={props.keywords} />
        <meta name="author" content={props.author} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={props.title} />
        <meta property="og:description" content={props.description} />
        <meta property="og:image" content={props.image} />
        <meta property="og:url" content={props.url} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Gugi&family=Noto+Sans+KR:wght@100;300;400;500&display=swap"
          rel="stylesheet"
          type="text/css"
        />

        {/* Helmet 안에서 CSS적용하기 */}
        <style type="text/css">{`
            *{
                list-style: none;
            }

            body {
                margin: 0;
                padding: 0;
            }
         
            `}</style>
        {/* 추가적으로 적용해야 할 외부 js나 css로 여기서 명시할 수 있다. */}
      </Helmet>
    </HelmetProvider>
  );
};
/* 이게 props */
Meta.defaultProps = {
  title: "useage of OpenAPI",
  description: "OpenAPI 활용 제출물입니다.",
  keywords: "OpenAPI",
  author: "최수진,박세영",
  url: window.location.href,
};

export default Meta;
