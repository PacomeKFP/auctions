import ContentLoader from "react-content-loader";
export const SimpleArticleContentLoader = () => {
  return (
    <ContentLoader viewBox="0 0 600 480" height={480} width={600}>

      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((element) => {
        return (
          <rect
            key={element}
            y={String(80 + element * 25)}
            rx="3"
            ry="3"
            width="600"
            height="9"
          />
        );
      })}


    </ContentLoader>
  );
};

export const CenteredContentLoader = () => {
  return (
    <div className="w-100 d-flex  justify-content-center">
      <SimpleArticleContentLoader />
    </div>
  )

}
