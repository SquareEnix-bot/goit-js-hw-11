export const img = ({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
  return `<div class="photo-card">
            <a class="img-container" href="${largeImageURL}">
              <img class="card-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
            </a >
            <div class="info">
              <p class="info-item">
                <b>Likes</b> ${likes}
              </p>
              <p class="info-item">
                <b>Views</b> ${views}
              </p>
              <p class="info-item">
                <b>Comments</b> ${comments}
              </p>
              <p class="info-item">
                <b>Downloads</b> ${downloads}
              </p>
            </div>
          </div>                  
          `
}

